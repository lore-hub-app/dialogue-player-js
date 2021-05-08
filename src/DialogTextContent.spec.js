import DialogTextContent from "./DialogTextContent";

describe("DialogTextContent.ctor", () => {
  it("correct data, should create", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const value = "value";

    // act
    const content = new DialogTextContent(id, value);

    // assert
    expect(content.id).toBe(id);
    expect(content.value).toBe(value);
  });
});
