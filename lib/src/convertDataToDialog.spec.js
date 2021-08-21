import convertDataToDialog from "./convertDataToDialog";
import DialogDTO from "./dto/DialogDTO";
import DialogNodeDTO from "./dto/DialogNodeDTO";
import ContentBlockDTO from "./dto/ContentBlockDTO";
import ContentDataTextDTO from './dto/content/ContentDataTextDTO';
import ContentDataReferenceDTO from './dto/content/ContentDataReferenceDTO'
import DocumentDTO from './dto/DocumentDTO';

let blockId = 0;
let dataId = 0;

function buildContentBlockText(nodeId, index, text = null) {
  const data = new ContentDataTextDTO(
    (dataId + 1).toString(),
    text ? text : `ContentDataTextDTO text ${dataID}`
  );
  const block = new ContentBlockDTO(
    (blockId + 1).toString(),
    nodeId,
    'text',
    index,
    data
  )
  return block;
}

function buildContentBlockRef(nodeId, index, docId) {
  const data = new ContentDataReferenceDTO(
    (dataId + 1).toString(),
    null,
    docId
  );
  const block = new ContentBlockDTO(
    (blockId + 1).toString(),
    nodeId,
    'reference',
    index,
    data
  )
  return block;
}

describe("convertDataToDialog", () => {
  it("correct data, should convert", () => {
    // arrange

    const doc = new DocumentDTO(
      "65FA0570-23A9-40F7-9390-B5D5128088DF",
      'Oliver'
    );

    const dialogNodeTwoDTO = new DialogNodeDTO(
      "D4E3768F-E481-4075-9851-4A9C9848FE09"
    );
    const contentTwo = buildContentBlockRef(dialogNodeTwoDTO.id, 0, doc.id);

    const dialogNodeOneDTO = new DialogNodeDTO(
      "A0151775-E2E1-4C57-A0E2-4A3BE6331855",
      dialogNodeTwoDTO.id
    );
    const contentOne = buildContentBlockText(dialogNodeOneDTO.id, 0, 'Hey how are you?');

    const dialogDTO = new DialogDTO(
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      dialogNodeOneDTO.id
    );

    // act
    const dialog = convertDataToDialog(
      dialogDTO,
      [dialogNodeTwoDTO, dialogNodeOneDTO],
      [contentOne, contentTwo],
      [doc]
    );

    // assert
    expect(dialog.id).toBe(dialogDTO.id);
    expect(dialog.startNode.id).toBe(dialogNodeOneDTO.id);
    expect(dialog.startNode.nextNode.id).toBe(dialogNodeTwoDTO.id)

    // assert that text type as text has text
    expect(dialog.startNode.content[0].text).toBe(contentOne.data.text);
    // assert that ref type as text has doc name
    expect(dialog.startNode.nextNode.content[0].text).toBe(doc.name)
  });

  it("content is not in order of indexes, should set the correct order", () => {
    // arrange
    const dialogNodeOneDTO = new DialogNodeDTO(
      "A0151775-E2E1-4C57-A0E2-4A3BE6331855",
      null
    );

    const contentFirst = buildContentBlockText(dialogNodeOneDTO.id, 0, 'Hey!');
    const contentSecond = buildContentBlockText(dialogNodeOneDTO.id, 1, 'How are you?');

    const dialogDTO = new DialogDTO(
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      dialogNodeOneDTO.id
    );

    // act
    const dialog = convertDataToDialog(
      dialogDTO,
      [dialogNodeOneDTO],
      [contentSecond, contentFirst],
      []
    );

    // assert
    expect(dialog.currentNode.content[0].id).toBe(contentFirst.id);
    expect(dialog.currentNode.content[1].id).toBe(contentSecond.id);
  });
});
