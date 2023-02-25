import { Dialogue } from "../Dialogue";
import { DialogueNode } from "../nodes/DialogueNode";
import { DialogueTextContent } from "../contents/DialogueTextContent";
import { DialogueReferenceContent } from '../contents/DialogueReferenceContent';
import { DialogueNodeOption } from '../options/DialogueNodeOption';
import { BooleanVariable } from "../variables/BooleanVariable";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";
import { RequiredVariable } from "../variables/RequiredVariable";
import { IDialogue } from "../schema/IDialogue";
import { IContentBlock, isContentBlockReference } from "../schema/IContentBlock";
import { IDialogueNode } from "../schema/IDialogueNode";
import { FullId } from "../primitives/FullId";
import { ILink } from "../schema/ILink";
import { IDocument } from "../schema/IDocument";
import { IDialogueNodeOption } from "../schema/IDialogueNodeOption";
import { IVariable } from "../schema/IVariable";
import { IMetaSchema } from "../schema/IMetaSchema";


/**
 * Will convert data from server to a dialogue.
 * @param {string} data JSON dialogue schema https://lorehub.app/documentation/dialogue-schema-api/export-schema-v2
 */
export function convertExportDataToDialogue(data: any): Dialogue {

  // TODO: data should be unknown and add validation to each resource
  const resources = data.resources;
  /** https://lorehub.app/documentation/dialogue-schema-api/dialogue-v2 */
  const dialogue: IDialogue = resources.find((d: any) => d.type === '@lorehub/dialogue') as IDialogue;
  /** https://lorehub.app/documentation/dialogue-schema-api/dialogue-node-v2 */
  const nodes: IDialogueNode[] = resources.filter((r: any) => r.type === "@lorehub/dialogue-node") as IDialogueNode[];
  /* https://lorehub.app/documentation/dialogue-schema-api/content-block-v1 */
  const blocks: IContentBlock[] = resources.filter((r: any) => r.type === '@lorehub/content-block') as IContentBlock[];
  /** https://lorehub.app/documentation/dialogue-schema-api/document-v1 */
  const documents: IDocument[] = resources.filter((r: any) => r.type === '@lorehub/document') as IDocument[];
  /** https://lorehub.app/documentation/dialogue-schema-api/dialogue-node-option-v2 */
  const nodeOptions: IDialogueNodeOption[] = resources.filter((r: any) => r.type === '@lorehub/dialogue-node-option') as IDialogueNodeOption[];
  /** https://lorehub.app/documentation/dialogue-schema-api/variable-v1 */
  const variables: IVariable[] = resources.filter((r: any) => r.type === '@lorehub/variable') as IVariable[];
  /** https://lorehub.app/documentation/dialogue-schema-api/meta-schema-v1 */
  const metaSchema: IMetaSchema[] = resources.filter((r: any) => r.type === '@lorehub/meta-schema') as IMetaSchema[];
  /** https://lorehub.app/documentation/dialogue-schema-api/link-v1 */
  const links: ILink[] = resources.filter((r: any) => r.type === '@lorehub/dialogue-link') as ILink[];

  const convertedNodes = createDialogueNodes(
    nodes,
    blocks,
    documents,
    nodeOptions
  );

  const linkFromDialogue = links.find((l: ILink) => l.from === dialogue.id);
  if (linkFromDialogue == null) {
    throw new Error(`Cannot start dialogue because there is no link from dialogue`);
  }

  const startingNode = convertedNodes.find(n => n.id.fullValue === linkFromDialogue.to);
  if (startingNode == null) {
    throw new Error(`Cannot find starting node with id ${linkFromDialogue.to}.`);
  }

  const convertedVariables = variables.map((v: any) => new BooleanVariable(v.id, v.name, v.defaultValue))
  const dialog = new Dialogue(dialogue.id, startingNode, convertedVariables);
  console.log(dialog);
  return dialog;
}

function createDialogueNodes(dialogueNodes: IDialogueNode[], contentBlocks: IContentBlock[], documents: IDocument[], options: IDialogueNodeOption[]): DialogueNode[] {
  // TODO: data should be unknown and add validation to each resource
  const nodes: DialogueNode[] = [];
  for (const node of dialogueNodes) {
    nodes.push(createNode(node, dialogueNodes, contentBlocks, documents, options))
  }
  return nodes;
}


function createNode(node: IDialogueNode, dialogueNodes: IDialogueNode[], contentBlocks: IContentBlock[], documents: IDocument[], options: IDialogueNodeOption[]): DialogueNode {

  // Convert content.
  const nodeFullId = new FullId(node.id);
  const contentBlock = contentBlocks.find((c: IContentBlock) => c.id === nodeFullId.id);
  if (contentBlock == null) throw new Error(`Cannot create node because Content Block is null ${nodeFullId.id}`);
  const convertedContent: Array<DialogueTextContent | DialogueReferenceContent> = [];
  for (const content of contentBlock.content) {
    if (isContentBlockReference(content)) {
      const neededDocument = documents.find(d => d.id === content.documentId);
      if (neededDocument == null) {
        throw new Error(`Cannot find document for DialogueReferenceContent ${content.documentId}`);
      }
      convertedContent.push(new DialogueReferenceContent(contentBlock.id, content.text, content.documentId, neededDocument.name));
    }
    else {
      convertedContent.push(new DialogueTextContent(contentBlock.id, content.text));
    }

  }
  // Convert options.
  const convertedOptions: DialogueNodeOption[] = [];
  for (const optionId of node.optionsIds) {
    const neededOption = options.find(o => o.id === optionId);
    if (neededOption == null) {
      throw new Error(`Cannot find needed option ${optionId}`);
    }
    const requiredVariables = neededOption.requiredVariables ? neededOption.requiredVariables.map(v => new RequiredVariable(v.variableId, v.value)) : [];
    convertedOptions.push(new DialogueNodeOption(neededOption.id, neededOption.text, requiredVariables))
  }
  const setVariableOnStart = node.setVariableOnStart ? node.setVariableOnStart.map(v => new SetVariableOnStart(v.variableId, v.value)) : [];
  return new DialogueNode(node.id, convertedContent, convertedOptions, setVariableOnStart);
}
