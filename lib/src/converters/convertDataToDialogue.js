import Dialog from "../Dialog";
import DialogNode from "../nodes/DialogNode";
import DialogTextContent from "../contents/DialogTextContent";
import DialogReferenceContent from '../contents/DialogReferenceContent';
import DialogNodeOption from '../options/DialogNodeOption';

/**
 * Will convert data from server to a dialogue.
 * @param {string} data JSON dialogue schema http://docs.lorehub.app
 * @returns {Dialog}
 */
export function convertDataToDialogue(data) {
  

  // const nodes = createDialogNodes(
  //   dialogNodeDTOs,
  //   contentBlockDTOs,
  //   documentDTOs
  // );
  // const startingNode = nodes.find(n => n.id === dialogDTO.startingNodeId);

  // if (startingNode == null) {
  //   throw new Error(
  //     `Cannot find starting node with id ${dialogDTO.startingNodeId}.`
  //   );
  // }
  const resources = data.resources;
  console.log(resources);
  const dialogue = resources.find(d => d.type === '@lorehub/dialogue');
  console.log(dialogue);
  const dialog = new Dialog(data["resources"], startingNode);
  return dialog;
}

/**
 * @param {Array<DialogNodeDTO>} dialogNodeDTOs
 * @param {Array<ContentBlockDTO>} contentBlockDTOs
 * @param {Array<DocumentDTO>} documentDTOs
 */
function createDialogNodes(dialogNodeDTOs, contentBlockDTOs, documentDTOs) {
  const nodes = [];
  let optionsDTO = [];
  for (let i = 0; i < dialogNodeDTOs.length; i++) {
    const dto = dialogNodeDTOs[i];
    const contentDTOs = contentBlockDTOs
      .filter(c => c.dialogNodeId == dto.id)
      .sort((a, b) => (a.index > b.index ? 1 : -1));
    let contentForNode = [];
    for (let z = 0; z < contentDTOs.length; z++) {
      const contentDTO = contentDTOs[z];
      if (contentDTO.type === "text") {
        const content = new DialogTextContent(
          contentDTO.id,
          contentDTO.data.text
        );
        contentForNode.push(content);
      } else if (contentDTO.type === "reference") {
        const neededDoc = documentDTOs.find(
          d => d.id === contentDTO.data.documentId
        );
        if (neededDoc == null)
          throw new Error(
            `To create a node for a reference type I need document. I cannot find a document with id ${contentDTO.data.documentId}`
          );
        const content = new DialogReferenceContent(
          contentDTO.id,
          contentDTO.data.text,
          contentDTO.data.documentId,
          neededDoc.name
        );
        contentForNode.push(content);
      } else {
        throw new Error(
          `Cannot convert to DialogContent for type ${contentDTO.type}.`
        );
      }
    }
    const optionsForNodeDTO = [];
    for (const optionDTO of dto.options) {
      optionsForNodeDTO.push(optionDTO);
    }
    optionsDTO = optionsDTO.concat(optionsForNodeDTO);
    nodes.push(new DialogNode(dto.id, contentForNode, null, []));
  }

  for (let i = 0; i < nodes.length; i++) {
    const dto = dialogNodeDTOs[i];
    const node = nodes[i];
    const options = [];
    if (dto.nextDialogNodeId) {
      const nextNode = nodes.find(n => n.id === dto.nextDialogNodeId);
      node.setNextNode(nextNode);
    }
    if (dto.options && dto.options.length > 0) {
      for (const optionDTO of dto.options) {
        const nextNode = nodes.find(n => n.id === optionDTO.nextDialogNodeId);
        const option = new DialogNodeOption(
          optionDTO.id,
          optionDTO.text,
          nextNode
        );
        options.push(option);
      }
      node.setOptions(options);
    }
  }

  return nodes;
}
