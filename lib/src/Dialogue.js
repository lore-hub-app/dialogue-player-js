
import { DialogueNode } from './nodes/DialogueNode'
import { BooleanVariable } from './variables/BooleanVariable';

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
   * @param {DialogueNode} node 
   */
  setCurrentNode(node) {
    this.currentNode = node;
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
