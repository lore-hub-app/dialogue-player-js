import ContentDataReference from './content/ContentDataReferenceDTO';
import ContentDataText from './content/ContentDataTextDTO';

export default class ContentBlockDTO {
  /**
   * @param {String} id
   * @param {String} dialogNodeId
   * @param {String} type can be 'text' or 'reference'
   * @param {Number} index
   * @param {ContentDataReference | ContentDataText } data
   */
  constructor(id, dialogNodeId, type, index, data) {
    this.id = id;
    this.dialogNodeId = dialogNodeId;
    this.type = type;
    this.index = index;
    this.data = data;
  }
}
