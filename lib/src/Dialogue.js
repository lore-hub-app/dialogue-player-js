
import { DialogueNode } from './nodes/DialogueNode'

export class Dialogue {
  /**
  * @param {String} id
  * @param {DialogueNode} startNode
  */
  constructor(id, startNode) {
    dialogGuard(id, startNode);

    this.id = id;
    /** @type DialogueNode */
    this.startNode = startNode;
    this.nodes = [];
    this.currentNode = startNode;
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
