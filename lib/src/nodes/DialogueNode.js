export class DialogueNode {
  /**
   * @param {String} id
   * @param {Array<DialogueTextContent | DialogueTextContent>} content
   * @param {DialogueNode|null} nextNode
   * @param {Array<DialogueNodeOption>} options
   * @param {Array<SetVariableOnStart>} options
   */
  constructor(id, content, nextNode = null, options = [], setVariableOnStart = []) {
    dialogueNodeGuard(id, content);

    this.id = id;
    this.content = content;
    this.nextNode = nextNode;
    this.options = options;
    this.setVariableOnStart = setVariableOnStart;
  }

  /**
   * @param {DialogueNode|null} nextNode
   */
  setNextNode(node) {
    this.nextNode = node;
  }

  /**
   * @param {Array<DialogueNodeOption>} options
   */
  setOptions(options) {
    this.options = options;
  }
}

function dialogueNodeGuard(id, content) {
  if (id == null || content == null) {
    throw new Error(
      `Cannot create DialogueNode because id: ${id} or content: ${content} is null.`
    );
  }
}
