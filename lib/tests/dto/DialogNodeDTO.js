export default class DialogNodeDTO {
  /**
   * @param {String} id
   * @param {String | null} nextDialogNodeId
   * @param {Array<DialogOptionDTO>} options
   */
  constructor(id, nextDialogNodeId = null, options = []) {
    this.id = id;
    this.nextDialogNodeId = nextDialogNodeId;
    this.options = options;
  }
}
