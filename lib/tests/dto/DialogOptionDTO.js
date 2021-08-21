export default class DialogOptionDTO {
  /**
   * @param {String} id
   * @param {number} index
   * @param {String | null} nextDialogNodeId
   * @param {String} text
   */
  constructor(id, index, nextDialogNodeId, text) {
    this.id = id;
    this.index = index;
    this.nextDialogNodeId = nextDialogNodeId;
    this.text = text;
  }
}
