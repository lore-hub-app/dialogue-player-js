export class DialogueReferenceContent {
    /**
    * @param {string} id
    * @param {string | null} text
    * @param {string | null} documentId
    */
    constructor(id, text, documentId, documentName) {
        this.id = id;
        this._text = text;
        this.documentId = documentId;
        this.documentName = documentName
    }

    /**
     * Will use document name if text is null.
     */
    get text() {
        return this._text == null ? this.documentName : this._text;
    }

}
