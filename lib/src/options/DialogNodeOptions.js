export default class DialogNodeOption {
  /**
   * @param {String} id
   * @param {String} text
   * @param {DialogNode|null} nextNode
   */
  constructor(id, text, nextNode = null) {
    super(nextNode);

    if (id == null || text == null) {
      throw new Error(
        `Cannot create DialogNodeOption because id: ${id} or text: ${text} is null.`
      );
    }
    this.id = id;
    this.text = text;
    this.nextNode = nextNode;
  }

  /**
   * @param {DialogNode|null} nextNode
   */
  setNextNode(nextNode = null) {
    this.nextNode = nextNode;
  }
}
