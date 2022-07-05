import convertDataToDialog from "../src/converters/convertDataToDialog";
import DialogDTO from "./dto/DialogDTO";
import DialogNodeDTO from "./dto/DialogNodeDTO";
import ContentBlockDTO from "./dto/ContentBlockDTO";
import ContentDataTextDTO from './dto/content/ContentDataTextDTO';
import ContentDataReferenceDTO from './dto/content/ContentDataReferenceDTO'
import DocumentDTO from './dto/DocumentDTO';
import DialogOptionDTO from './dto/DialogOptionDTO';

import { describe, it, expect } from 'vitest';

let blockId = 0;
let dataId = 0;

function buildContentBlockText(nodeId, index, text = null) {
  const data = new ContentDataTextDTO(
    (dataId + 1).toString(),
    text ? text : `ContentDataTextDTO text ${nodeId}`
  );
  const block = new ContentBlockDTO(
    (blockId + 1).toString(),
    nodeId,
    "text",
    index,
    data
  );
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
    "reference",
    index,
    data
  );
  return block;
}

describe("convertDataToDialog", () => {
  /**
   * "Hey how are you?" -> ""
   */
  it("linear dialog, should convert", () => {
    // arrange

    const doc = new DocumentDTO(
      "65FA0570-23A9-40F7-9390-B5D5128088DF",
      "Oliver"
    );

    const dialogNodeTwoDTO = new DialogNodeDTO(
      "D4E3768F-E481-4075-9851-4A9C9848FE09"
    );
    const contentTwo = buildContentBlockRef(dialogNodeTwoDTO.id, 0, doc.id);

    const dialogNodeOneDTO = new DialogNodeDTO(
      "A0221775-E2E1-4C57-A0E2-4A3BE6331855",
      dialogNodeTwoDTO.id
    );
    const contentOne = buildContentBlockText(
      dialogNodeOneDTO.id,
      0,
      "Hey how are you?"
    );

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
    expect(dialog.startNode.nextNode.id).toBe(dialogNodeTwoDTO.id);

    // assert that text type as text has text
    expect(dialog.startNode.content[0].text).toBe(contentOne.data.text);
    // assert that ref type as text has doc name
    expect(dialog.startNode.nextNode.content[0].text).toBe(doc.name);
  });

  /**
   * nodeOne: "Hey how are you?"
   * ------ optionA: I am Fine >>>>>>>>>>>>>> nodeTwo:   "Good"
   * ------ optionB: I am Bad  >>>>>>>>>>>>>> nodeThree: "Oh.."
   */
  it("branching dialog, should convert", () => {
    // arrange

    const nodeTwo = new DialogNodeDTO("nodeTwoId", null, []);
    const nodeTwoContent = buildContentBlockText(nodeTwo.id, 0, "Good");
    const optionA = new DialogOptionDTO(
      "optionAId",
      0,
      nodeTwo.id,
      "I am Fine"
    );

    const nodeThree = new DialogNodeDTO("nodeThreeId", null, []);
    const nodeThreeContent = buildContentBlockText(nodeThree.id, 0, "Oh..");
    const optionB = new DialogOptionDTO(
      "optionBId",
      0,
      nodeThree.id,
      "I am Bad"
    );

    const nodeOne = new DialogNodeDTO("nodeOneId", null, [optionA, optionB]);
    const nodeOneContent = buildContentBlockText(
      nodeOne.id,
      0,
      "Hey how are you?"
    );

    const dialogDTO = new DialogDTO(
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      nodeOne.id
    );

    // act
    const dialog = convertDataToDialog(
      dialogDTO,
      [nodeOne, nodeTwo, nodeThree],
      [nodeOneContent, nodeTwoContent, nodeThreeContent],
      []
    );

    // assert
    expect(dialog.id).toBe(dialogDTO.id);
    expect(dialog.startNode.id).toBe(nodeOne.id);
    expect(dialog.startNode.nextNode).toBe(null);

    // assert options
    expect(dialog.startNode.options.length).toBe(2);
    expect(dialog.startNode.options[0].id).toBe(optionA.id);
    expect(dialog.startNode.options[1].id).toBe(optionB.id);
    expect(dialog.startNode.options[0].nextNode.id).toBe(nodeTwo.id);
    expect(dialog.startNode.options[1].nextNode.id).toBe(nodeThree.id);
  });

  it("content is not in order of indexes, should set the correct order", () => {
    // arrange
    const dialogNodeOneDTO = new DialogNodeDTO(
      "A0151775-E2E1-4C57-A0E2-4A3BE6331855",
      null
    );

    const contentFirst = buildContentBlockText(dialogNodeOneDTO.id, 0, "Hey!");
    const contentSecond = buildContentBlockText(
      dialogNodeOneDTO.id,
      1,
      "How are you?"
    );

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
