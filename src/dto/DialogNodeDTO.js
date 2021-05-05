export default class DialogNodeDTO {
  /**
   * @param {String} id
   * @param {String | null} nextDialogNodeId
   */
  constructor(id, nextDialogNodeId = null) {
    this.id = id;
    this.nextDialogNodeId = nextDialogNodeId;
  }
}
