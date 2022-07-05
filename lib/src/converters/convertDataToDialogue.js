import {Dialogue} from "../Dialogue";
import {DialogueNode} from "../nodes/DialogueNode";
import { DialogueTextContent } from "../contents/DialogueTextContent";
import {DialogueReferenceContent} from '../contents/DialogueReferenceContent';
import {DialogueNodeOption} from '../options/DialogueNodeOption';

/**
 * Will convert data from server to a dialogue.
 * @param {string} data JSON dialogue schema https://docs.lorehub.app/export-schema/v1.html
 * @returns {Dialogue}
 */
export function convertDataToDialogue(data) {
  const resources = data.resources;
  /** https://docs.lorehub.app/dialogue/v1.html */
  const dialogue = resources.find(d => d.type === '@lorehub/dialogue');
  /** https://docs.lorehub.app/dialogue-node/v1.html */
  const nodes = resources.filter(r => r.type === "@lorehub/dialogue-node");
  const blocks = resources.filter(r => r.type === '@lorehub/content-block');
  /** https://docs.lorehub.app/document/v1.html */
  const documents = resources.filter(r => r.type === '@lorehub/document');
  /** https://docs.lorehub.app/dialogue-node/v1.html */
  const nodeOptions = resources.filter(r => r.type === '@lorehub/dialogue-node-option');
  /** https://docs.lorehub.app/variable/v1.html */
  const variables = resources.filter(r => r.type === '@lorehub/variable');
  /** https://docs.lorehub.app/meta-schema/v1.html */
  const metaSchema = resources.filter(r => r.type === '@lorehub/meta-schema');

  const convertedNodes = createDialogueNodes(
    nodes,
    blocks,
    documents,
    nodeOptions
  );

  const startingNode = convertedNodes.find(n => n.id === dialogue.startingNodeId);
  if (startingNode == null) {
    throw new Error(
      `Cannot find starting node with id ${dialogue.startingNodeId}.`
    );
  }


  const dialog = new Dialogue(dialogue.id, startingNode);
  return dialog;
}

/**
 * @param {Array<any>} dialogNodes
 * @param {Array<any>} contentBlocks
 * @param {Array<any>} documents
 * @param {Array<any>} options
 */
function createDialogueNodes(dialogueNodes, contentBlocks, documents, options) {
  const nodes = [];

  for (const node of dialogueNodes) {
    // Convert content.
    const contentBlock = contentBlocks.find(c => c.id === node.id);
    const convertedContent = [];
    for (const content of contentBlock.content) {
      if (content.documentId){
        const neededDocument = documents.find(d => d.id === content.documentId);
        convertedContent.push(new DialogueReferenceContent(contentBlock.id, content.text, content.documentId, neededDocument.name));
      }
      else{
        convertedContent.push(new DialogueTextContent(contentBlock.id, content.text));
      }

    }
    // Convert options.
    const convertedOptions = [];
    for (const optionId of node.optionsIds) {
      const neededOption = options.find(o => o.id === optionId);
      convertedOptions.push(new DialogueNodeOption(neededOption.id, neededOption.text, neededOption.nextDialogId))
    }
    nodes.push(new DialogueNode(node.id, convertedContent, node.nextDialogueNodeId, convertedOptions));
  }

  let optionsDTO = [];
  // for (let i = 0; i < dialogNodeDTOs.length; i++) {
  //   const dto = dialogNodeDTOs[i];
  //   const contentDTOs = contentBlockDTOs
  //     .filter(c => c.dialogNodeId == dto.id)
  //     .sort((a, b) => (a.index > b.index ? 1 : -1));
  //   let contentForNode = [];
  //   for (let z = 0; z < contentDTOs.length; z++) {
  //     const contentDTO = contentDTOs[z];
  //     if (contentDTO.type === "text") {
  //       const content = new DialogTextContent(
  //         contentDTO.id,
  //         contentDTO.data.text
  //       );
  //       contentForNode.push(content);
  //     } else if (contentDTO.type === "reference") {
  //       const neededDoc = documentDTOs.find(
  //         d => d.id === contentDTO.data.documentId
  //       );
  //       if (neededDoc == null)
  //         throw new Error(
  //           `To create a node for a reference type I need document. I cannot find a document with id ${contentDTO.data.documentId}`
  //         );
  //       const content = new DialogReferenceContent(
  //         contentDTO.id,
  //         contentDTO.data.text,
  //         contentDTO.data.documentId,
  //         neededDoc.name
  //       );
  //       contentForNode.push(content);
  //     } else {
  //       throw new Error(
  //         `Cannot convert to DialogContent for type ${contentDTO.type}.`
  //       );
  //     }
  //   }
  //   const optionsForNodeDTO = [];
  //   for (const optionDTO of dto.options) {
  //     optionsForNodeDTO.push(optionDTO);
  //   }
  //   optionsDTO = optionsDTO.concat(optionsForNodeDTO);
  //   nodes.push(new DialogNode(dto.id, contentForNode, null, []));
  // }

  // for (let i = 0; i < nodes.length; i++) {
  //   const dto = dialogNodeDTOs[i];
  //   const node = nodes[i];
  //   const options = [];
  //   if (dto.nextDialogNodeId) {
  //     const nextNode = nodes.find(n => n.id === dto.nextDialogNodeId);
  //     node.setNextNode(nextNode);
  //   }
  //   if (dto.options && dto.options.length > 0) {
  //     for (const optionDTO of dto.options) {
  //       const nextNode = nodes.find(n => n.id === optionDTO.nextDialogNodeId);
  //       const option = new DialogNodeOption(
  //         optionDTO.id,
  //         optionDTO.text,
  //         nextNode
  //       );
  //       options.push(option);
  //     }
  //     node.setOptions(options);
  //   }
  // }

  return nodes;
}
