import Dialog from "./Dialog";
import DialogNode from "./DialogNode";
import DialogTextContent from "./DialogTextContent";
import DialogDTO from "./dto/DialogDTO";
import DialogNodeDTO from "./dto/DialogNodeDTO";
import ContetnBlockDTO from "./dto/ContetnBlockDTO";

/**
 * Will convert data from server to a dialog.
 * @param {DialogDTO} dialogDTO
 * @param {Array<DialogNodeDTO>} dialogNodesDTO
 * @param {Array<ContetnBlockDTO>} contentBlocksDTO
 * @returns {Dialog}
 */
export default function convertDataToDialog(
  dialogDTO,
  dialogNodesDTO,
  contentBlocksDTO
) {
  if (dialogDTO == null || dialogNodesDTO == null || contentBlocksDTO == null) {
    throw new Error(
      `Cannot convert DTOs to a Dialog because 
      dialogDTO: ${dialogDTO} cannot be null OR 
      dialogNodesDTO: ${dialogNodesDTO} cannot be null OR 
      contentBlocksDTO: ${contentBlocksDTO} cannot be null.`
    );
  }

  const nodes = createDialogNodes(dialogNodesDTO, contentBlocksDTO);
  const startingNode = nodes.find(n => n.id === dialogDTO.startingNodeId);

  if (startingNode == null) {
    throw new Error(
      `Cannot find starting node with id ${dialogDTO.startingNodeId}.`
    );
  }
  const dialog = new Dialog(dialogDTO.id, startingNode);
  return dialog;
}

/**
 * @param {Array<DialogNodeDTO>} dialogNodesDTO
 * @param {Array<ContetnBlockDTO>} contentBlocksDTO
 */
function createDialogNodes(dialogNodesDTO, contentBlocksDTO) {
  let nodes = [];
  for (let i = 0; i < dialogNodesDTO.length; i++) {
    const dto = dialogNodesDTO[i];
    const contentDTOs = contentBlocksDTO
      .filter(c => c.dialogNodeId == dto.id)
      .sort((a, b) => (a.index > b.index ? 1 : -1));
    let contentForNode = [];
    for (let i = 0; i < contentDTOs.length; i++) {
      const contentDTO = contentDTOs[i];
      if (contentDTO.type === "text") {
        const content = new DialogTextContent(
          contentDTO.id,
          contentDTO.data.text
        );
        contentForNode.push(content);
      } else {
        throw new Error(
          `Cannot convert to DialogContent for type ${contentDTO.type}.`
        );
      }
    }
    nodes.push(new DialogNode(dto.id, contentForNode, null));
  }

  for (let i = 0; i < nodes.length; i++) {
    const dto = dialogNodesDTO[i];
    const node = nodes[i];
    if (dto.nextDialogNodeId) {
      node.nextNode = nodes.find(n => n.id === dto.nextDialogNodeId);
    }
  }
  return nodes;
}
