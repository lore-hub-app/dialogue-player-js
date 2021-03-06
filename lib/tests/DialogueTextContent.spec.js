import { DialogueTextContent } from "../src";
import { describe, it, expect } from 'vitest';

describe("DialogueTextContent.ctor", () => {
  it("correct data, should create", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const text = "text";

    // act
    const content = new DialogueTextContent(id, text);

    // assert
    expect(content.id).toBe(id);
    expect(content.text).toBe(text);
  });
});
