import Dialog from "./Dialog";
import DialogNode from "./DialogNode";
import DialogTextContent from "./DialogTextContent";
import DialogReferenceContent from './DialogReferenceContent';
import DialogDTO from "./dto/DialogDTO";
import DialogNodeDTO from "./dto/DialogNodeDTO";
import ContentBlockDTO from "./dto/ContentBlockDTO";
import DocumentDTO from './dto/DocumentDTO';

/**
 * Will convert data from server to a dialog.
 * @param {DialogDTO} dialogDTO
 * @param {Array<DialogNodeDTO>} dialogNodeDTOs
 * @param {Array<ContentBlockDTO>} contentBlockDTOs
 * @param {Array<DocumentDTO>} documentDTOs
 * @returns {Dialog}
 */
export default function convertDataToDialog(
  dialogDTO,
  dialogNodeDTOs,
  contentBlockDTOs,
  documentDTOs
) {
  if (dialogDTO == null ||
    dialogNodeDTOs == null ||
    contentBlockDTOs == null ||
    documentDTOs == null) {
    throw new Error(
      `Cannot convert DTOs to a Dialog because 
      dialogDTO: ${dialogDTO} cannot be null OR 
      dialogNodeDTOs: ${dialogNodeDTOs} cannot be null OR 
      contentBlockDTOs: ${contentBlockDTOs} cannot be null OR
      documentDTOs: ${documentDTOs} cannot be null.`
    );
  }

  const nodes = createDialogNodes(dialogNodeDTOs, contentBlockDTOs, documentDTOs);
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
 * @param {Array<DialogNodeDTO>} dialogNodeDTOs
 * @param {Array<ContentBlockDTO>} contentBlockDTOs
 * @param {Array<DocumentDTO>} documentDTOs
 */
function createDialogNodes(dialogNodeDTOs, contentBlockDTOs, documentDTOs) {
  let nodes = [];
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
      }
      else if (contentDTO.type === 'reference') {
        const neededDoc = documentDTOs.find(d => d.id === contentDTO.data.documentId);
        if (neededDoc == null) throw new Error(`To create a node for a reference type I need document. I cannot find a document with id ${contentDTO.data.documentId}`);
        const content = new DialogReferenceContent(
          contentDTO.id,
          contentDTO.data.text,
          contentDTO.data.documentId,
          neededDoc.name
        )
        contentForNode.push(content);
      }
      else {
        throw new Error(
          `Cannot convert to DialogContent for type ${contentDTO.type}.`
        );
      }
    }
    nodes.push(new DialogNode(dto.id, contentForNode, null));
  }

  for (let i = 0; i < nodes.length; i++) {
    const dto = dialogNodeDTOs[i];
    const node = nodes[i];
    if (dto.nextDialogNodeId) {
      node.nextNode = nodes.find(n => n.id === dto.nextDialogNodeId);
    }
  }
  return nodes;
}
