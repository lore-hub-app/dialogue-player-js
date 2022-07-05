export class DialogueNodeOption {
  /**
   * @param {String} id
   * @param {String} text
   * @param {DialogueNode|null} nextNode
   */
  constructor(id, text, nextNode = null) {
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
   * @param {DialogueNode|null} nextNode
   */
  setNextNode(nextNode = null) {
    this.nextNode = nextNode;
  }
}
