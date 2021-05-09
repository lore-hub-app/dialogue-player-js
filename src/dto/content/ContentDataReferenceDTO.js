export default class ContentDataReferenceDTO {
  /**
   * @param {String} id 
   * @param {String | null} text it is a custom display name, otherwise the name of the document should be taken
   * @param {String} documentId 
   */
  constructor(id, text, documentId) {
    this.id = id;
    this.text = text;
    this.documentId = documentId;
  }
}
