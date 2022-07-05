import { RequiredVariable } from "../variables/RequiredVariable";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";

export class DialogueNodeOption {
  /**
   * @param {String} id
   * @param {String} text
   * @param {DialogueNode|null} nextNode
   * @param {RequiredVariable[]} requiredVariables
   */
  constructor(id, text, nextNode = null, requiredVariables = []) {
    if (id == null || text == null) {
      throw new Error(
        `Cannot create DialogNodeOption because id: ${id} or text: ${text} is null.`
      );
    }
    this.id = id;
    this.text = text;
    this.nextNode = nextNode;
    this.requiredVariables = requiredVariables;
  }

  /**
   * @param {DialogueNode|null} nextNode
   */
  setNextNode(nextNode = null) {
    this.nextNode = nextNode;
  }
}
