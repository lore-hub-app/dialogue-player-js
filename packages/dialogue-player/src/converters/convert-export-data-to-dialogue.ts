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


/**
 * Will convert data from server to a dialogue.
 * @param {string} data JSON dialogue schema https://docs.lorehub.app/export-schema/v1.html
 */
export function convertExportDataToDialogue(data: any): Dialogue {

  // TODO: data should be unknown and add validation to each resource
  const resources = data.resources;
  /** https://docs.lorehub.app/dialogue/v1.html */
  const dialogue: IDialogue = resources.find((d: any) => d.type === '@lorehub/dialogue') as IDialogue;
  /** https://docs.lorehub.app/dialogue-node/v1.html */
  const nodes: IDialogueNode[] = resources.filter((r: any) => r.type === "@lorehub/dialogue-node") as IDialogueNode[];
  const blocks: IContentBlock[] = resources.filter((r: any) => r.type === '@lorehub/content-block') as IContentBlock[];
  /** https://docs.lorehub.app/document/v1.html */
  const documents = resources.filter((r: any) => r.type === '@lorehub/document');
  /** https://docs.lorehub.app/dialogue-node/v1.html */
  const nodeOptions = resources.filter((r: any) => r.type === '@lorehub/dialogue-node-option');
  /** https://docs.lorehub.app/variable/v1.html */
  const variables = resources.filter((r: any) => r.type === '@lorehub/variable');
  /** https://docs.lorehub.app/meta-schema/v1.html */
  const metaSchema = resources.filter((r: any) => r.type === '@lorehub/meta-schema');

  const convertedNodes = createDialogueNodes(
    nodes,
    blocks,
    documents,
    nodeOptions
  );

  const startingNode = convertedNodes.find((n: DialogueNode) => n.id === dialogue.startingNodeId);
  if (startingNode == null) {
    throw new Error(
      `Cannot find starting node with id ${dialogue.startingNodeId}.`
    );
  }
  const convertedVariables = variables.map((v: any) => new BooleanVariable(v.id, v.name, v.defaultValue))
  const dialog = new Dialogue(dialogue.id, startingNode, convertedVariables);
  return dialog;
}

function createDialogueNodes(dialogueNodes: IDialogueNode[], contentBlocks: IContentBlock[], documents: any[], options: any[]): DialogueNode[] {
  // TODO: data should be unknown and add validation to each resource
  const nodes: DialogueNode[] = [];
  for (const node of dialogueNodes) {
    nodes.push(createNode(node, dialogueNodes, contentBlocks, documents, options))
  }
  return nodes;
}


function createNode(node: IDialogueNode, dialogueNodes: IDialogueNode[], contentBlocks: IContentBlock[], documents: any[], options: any[]): DialogueNode {

  // Convert content.
  const nodeFullId = new FullId(node.id);
  const contentBlock = contentBlocks.find((c: IContentBlock) => c.id === nodeFullId.id);
  if (contentBlock == null) throw new Error(`Cannot create node because Content Block is null ${nodeFullId.id}`);
  const convertedContent: Array<DialogueTextContent | DialogueReferenceContent> = [];
  for (const content of contentBlock.content) {
    if (isContentBlockReference(content)) {
      const neededDocument = documents.find(d => d.id === content.documentId);
      convertedContent.push(new DialogueReferenceContent(contentBlock.id, content.text, content.documentId, neededDocument.name));
    }
    else {
      convertedContent.push(new DialogueTextContent(contentBlock.id, content.text));
    }

  }
  // Convert options.
  const convertedOptions = [];
  for (const optionId of node.optionsIds) {
    const neededOption = options.find(o => o.id === optionId);
    const nextNodeData = dialogueNodes.find(n => n.id === neededOption.nextDialogueNodeId);
    let nextNode = null;
    if (nextNodeData) {
      nextNode = createNode(nextNodeData, dialogueNodes, contentBlocks, documents, options);
    }
    const requiredVariables = neededOption.requiredVariables ? neededOption.requiredVariables.map((v: any) => new RequiredVariable(v.variableId, v.value)) : [];
    convertedOptions.push(new DialogueNodeOption(neededOption.id, neededOption.text, nextNode, requiredVariables))
  }
  const nextNodeData = dialogueNodes.find(n => n.id === node.nextDialogueNodeId);
  let nextNode = null;
  if (nextNodeData) {
    nextNode = createNode(nextNodeData, dialogueNodes, contentBlocks, documents, options);
  }
  const setVariableOnStart = node.setVariableOnStart ? node.setVariableOnStart.map((n: any) => new SetVariableOnStart(n.variableId, n.value)) : [];
  return new DialogueNode(node.id, convertedContent, nextNode, convertedOptions, setVariableOnStart);
}
