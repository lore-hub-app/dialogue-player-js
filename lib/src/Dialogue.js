
import { DialogueNode } from './nodes/DialogueNode'
import { BooleanVariable } from './variables/BooleanVariable';
import { SetVariableOnStart } from './variables/SerVariableOnStart';

export class Dialogue {
  /**
  * @param {String} id
  * @param {DialogueNode} startNode
  * @param {BooleanVariable} variables
  */
  constructor(id, startNode, variables) {
    dialogGuard(id, startNode);

    this.id = id;
    /** @type DialogueNode */
    this.startNode = startNode;
    this.nodes = [];
    this.currentNode = startNode;
    this.variables = variables;
  }

  get isFinished() {
    return this.currentNode == null;
  }

  /**
   * @param {SetVariableOnStart} setVariable 
   */
  setVariable(setVariable) {
    const needed = this.variables.find(v => v.id === setVariable.variableId);
    needed.changeCurrentValue(setVariable.value);
  }

  /**
   * @param {DialogueNode} node 
   */
  setCurrentNode(node) {
    this.currentNode = node;
    // apply variables on next node start
    for (const setVariable of node.setVariableOnStart) {
      this.setVariable(setVariable);
    }
  }
  /**
    * @param {DialogueNode} node 
    */
  addNode(node) {
    if (node instanceof DialogueNode) {
      this.nodes.push(node);
    }
    else {
      throw new Error("node must be instance of DialogueNode");
    }
  }
}

function dialogGuard(id, startNode) {
  if (id == null || startNode == null) {
    throw new Error(
      "Cannot create Dialogue because id or/and startNode is null."
    );
  }
}
