import { DialogReferenceContent } from "../src";
import { describe, it, expect } from 'vitest';

describe("DialogReferenceContent.ctor", () => {
    it("correct data, should create", () => {
        // arrange
        const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
        const text = "value";
        const documentId = "1C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
        const docName = "Oliver";

        // act
        const content = new DialogReferenceContent(id, text, documentId, docName);

        // assert
        expect(content.id).toBe(id);
        expect(content.text).toBe(text);
        expect(content.documentId).toBe(documentId);
        expect(content.documentName).toBe(docName);
    });

});

describe("DialogReferenceContent.text", () => {
    it("text is null, should return docname", () => {
        // arrange
        const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
        const text = null;
        const documentId = "1C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
        const docName = "Oliver";

        // act
        const content = new DialogReferenceContent(id, text, documentId, docName);

        // assert
        expect(content.text).toBe(docName);
    });

});
