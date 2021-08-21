export default class DialogNode {
  /**
   * @param {String} id
   * @param {DialogTextContent | DialogTextContent} content
   * @param {DialogNode|null} nextNode
   * @param {Array<DialogNodeOption>} options
   */
  constructor(id, content, nextNode = null, options = []) {
    dialogNodeGuard(id, content);

    this.id = id;
    this.content = content;
    this.nextNode = nextNode;
    this.options = options;
  }

  /**
   * @param {DialogNode|null} nextNode
   */
  setNextNode(node) {
    this.nextNode = node;
  }

  /**
   * @param {Array<DialogNodeOption>} options
   */
  setOptions(options) {
    this.options = options;
  }
}

function dialogNodeGuard(id, content) {
  if (id == null || content == null) {
    throw new Error(
      `Cannot create DialogNode because id: ${id} or content: ${content} is null.`
    );
  }
}
