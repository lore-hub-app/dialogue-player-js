export default class ContetnBlockDTO {
  /**
   * @param {String} id
   * @param {String} dialogNodeId
   * @param {String} type
   * @param {Number} index
   * @param {Array<any>} data
   */
  constructor(id, dialogNodeId, type, index, data) {
    this.id = id;
    this.dialogNodeId = dialogNodeId;
    this.type = type;
    this.index = index;
    this.data = data;
  }
}
