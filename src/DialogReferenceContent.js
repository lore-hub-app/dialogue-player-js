export default class ContentDataReference {
    /**
    * @param {string} id
    * @param {string | null} text
    * @param {string | null} documentId
    */
    constructor(id, text, documentId) {
        this.id = id;
        this.text = text;
        this.documentId = documentId;
    }
}
