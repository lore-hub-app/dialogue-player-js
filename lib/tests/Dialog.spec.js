import { Dialog, DialogNode, DialogTextContent } from "../src";

const testContent = new DialogTextContent(
  "9BEB03C5-867C-4355-AEBD-D3A64C82FFAA",
  "test content"
);

describe("Dialog.ctor", () => {
  it("correct data, should create", () => {
    // arrange
    const startNode = new DialogNode(
      "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      null
    );
    const id = "E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6";

    // act
    const dialog = new Dialog(id, startNode);

    // assert
    expect(dialog.id).toBe(id);
    expect(dialog.startNode).toBe(startNode);
  });
});

describe("Dialog.currentNode", () => {
  it("just created currentNode should be start node", () => {
    // arrange
    const startNode = new DialogNode(
      "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      null
    );
    const id = "E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6";

    // act
    const dialog = new Dialog(id, startNode);

    // assert
    expect(dialog.currentNode).toBe(startNode);
  });
});

describe("Dialog.finished", () => {
  it("next node is not null, should be false", () => {
    // arrange
    const nodeTwo = new DialogNode(
      "2C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      null
    );

    const nodeOne = new DialogNode(
      "1C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      nodeTwo
    );

    const dialog = new Dialog("E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6", nodeOne);

    // act
    const result = dialog.finished;

    // assert
    expect(result).toBe(false);
  });

  it("next node is null, should be true", () => {
    // arrange
    const nodeOne = new DialogNode(
      "1C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      null
    );

    const dialog = new Dialog("E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6", nodeOne);

    // act
    const result = dialog.finished;

    // assert
    expect(result).toBe(true);
  });
});

describe("Dialog play through multiple nodes.", () => {
  it("should change the current node and unsubscribe from it and subscribe to a new node", () => {
    // arrange

    const nodeTwo = new DialogNode(
      "2C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      null
    );

    const nodeOne = new DialogNode(
      "1C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      testContent,
      nodeTwo
    );

    const dialog = new Dialog("E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6", nodeOne);

    // act
    nodeOne.goNext();

    // assert
    expect(dialog.currentNode).toBe(nodeTwo);
    expect(nodeTwo.subscribers[0]).toBe(dialog);
    expect(nodeOne.subscribers[0]).not.toBe(dialog);
  });
});
