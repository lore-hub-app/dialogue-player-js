import convertDataToDialog from "./convertDataToDialog";
import DialogDTO from "./dto/DialogDTO";
import DialogNodeDTO from "./dto/DialogNodeDTO";
import ContentBlockDTO from "./dto/ContentBlockDTO";
import ContentDataTextDTO from './dto/content/ContentDataTextDTO';
import ContentDataReferenceDTO from './dto/content/ContentDataReferenceDTO'

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

function buildContentBlockRef(nodeId, index, doc) {
  const data = new ContentDataReferenceDTO(
    (dataId + 1).toString(),
    null,
    doc.id
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
    const dialogNodeTwoDTO = new DialogNodeDTO(
      "D4E3768F-E481-4075-9851-4A9C9848FE09"
    );
    const contentTwo = buildContentBlockText(dialogNodeTwoDTO.id, 0, 'I am fine!');

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
      [contentOne, contentTwo]
    );

    // assert
    expect(dialog.id).toBe(dialogDTO.id);
    expect(dialog.startNode.id).toBe(dialogNodeOneDTO.id);
  });

  it("content is not in order of indexes, should set the correct order", () => {
    // arrange

    const dialogNodeOneDTO = new DialogNodeDTO(
      "A0151775-E2E1-4C57-A0E2-4A3BE6331855",
      null
    );

    const contentFirst = new ContentBlockDTO(
      "1fa85f64-5717-4562-b3fc-2c963f66afa6",
      dialogNodeOneDTO.id,
      "text",
      0,
      {
        id: "13385f64-5717-4562-b3fc-2c963f66afa6",
        lang: null,
        text: "Hey!",
      },
    );

    const contentSecond = new ContentBlockDTO(
      "2fa85f64-5717-4562-b3fc-2c963f66afa6",
      dialogNodeOneDTO.id,
      "text",
      1,
      {
        id: "23385f64-5717-4562-b3fc-2c963f66afa6",
        lang: null,
        text: "How are you",
      },
    );

    const dialogDTO = new DialogDTO(
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      dialogNodeOneDTO.id
    );

    // act
    const dialog = convertDataToDialog(
      dialogDTO,
      [dialogNodeOneDTO],
      [contentSecond, contentFirst]
    );

    // assert
    expect(dialog.currentNode.content[0].id).toBe(contentFirst.id);
    expect(dialog.currentNode.content[1].id).toBe(contentSecond.id);
  });
});
