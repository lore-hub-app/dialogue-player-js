import { DialogueNode, DialogueTextContent } from "../src";
import { describe, it, expect } from 'vitest';

const testContent = new DialogueTextContent(
  "9BEB03C5-867C-4355-AEBD-D3A64C82FFAA",
  "test content"
);

describe("DialogNode.ctor", () => {
  it("correct data and next node is null, should create", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = null;

    // act
    const node = new DialogueNode(id, [testContent], nextNode);

    // assert
    expect(node.id).toBe(id);
    expect(node.nextNode).toBe(nextNode);
    expect(node.content[0]).toBe(testContent);
  });

  it("correct data and next node is not null, should create", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogueNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    // act
    const node = new DialogueNode(id, testContent, nextNode);

    // assert
    expect(node.id).toBe(id);
    expect(node.nextNode).toBe(nextNode);
  });

});
