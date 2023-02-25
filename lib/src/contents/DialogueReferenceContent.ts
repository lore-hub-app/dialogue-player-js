export class DialogueReferenceContent {
    constructor(
        public readonly id: string,
        private readonly _text: string | null,
        public readonly documentId: string | null,
        public readonly documentName: string | null) {
    }

    /**
     * Will use document name if text is null.
     */
    get text() {
        return this._text == null ? this.documentName : this._text;
    }
}
