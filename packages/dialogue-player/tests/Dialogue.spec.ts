import { Dialogue, DialogueNode, DialogueTextContent } from "../src";
import { describe, it, expect } from 'vitest';

const testContent = new DialogueTextContent(
  "9BEB03C5-867C-4355-AEBD-D3A64C82FFAA",
  "test content"
);

describe("Dialogue.ctor", () => {
  it("correct data, should create", () => {
    // arrange
    const startNode = new DialogueNode(
      "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      [testContent],
      null
    );
    const id = "E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6";

    // act
    const dialog = new Dialogue(id, startNode, []);

    // assert
    expect(dialog.id).toBe(id);
    expect(dialog.startNode).toBe(startNode);
  });
});

describe("Dialogue.currentNode", () => {
  it("just created currentNode should be start node", () => {
    // arrange
    const startNode = new DialogueNode(
      "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9",
      [testContent],
      null
    );
    const id = "E4DBD07B-2FE7-4C3A-80A8-523BE7B957A6";

    // act
    const dialog = new Dialogue(id, startNode, []);

    // assert
    expect(dialog.currentNode).toBe(startNode);
  });
});

