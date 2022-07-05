import {SetVariableOnStart} from '../variables/SerVariableOnStart';

export class DialogueNodeOption {
  /**
   * @param {String} id
   * @param {String} text
   * @param {DialogueNode|null} nextNode
   * @param {SetVariableOnStart[]} setVariableOnStart
   */
  constructor(id, text, nextNode = null, setVariableOnStart) {
    if (id == null || text == null) {
      throw new Error(
        `Cannot create DialogNodeOption because id: ${id} or text: ${text} is null.`
      );
    }
    this.id = id;
    this.text = text;
    this.nextNode = nextNode;
    this.setVariableOnStart = setVariableOnStart;
  }

  /**
   * @param {DialogueNode|null} nextNode
   */
  setNextNode(nextNode = null) {
    this.nextNode = nextNode;
  }
}
