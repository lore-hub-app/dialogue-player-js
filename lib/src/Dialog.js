
import DialogNode from './nodes/DialogNode'

export default class Dialog {
  /**
  * @param {String} id
  * @param {DialogNode} startNode
  */
  constructor(id, startNode) {
    dialogGuard(id, startNode);

    this.id = id;
    this.startNode = startNode;
    this.nodes = [];
    this.currentNode = startNode;
  }

  get isFinished() {
    return this.currentNode == null;
  }

  /**
   * @param {DialogNode} node 
   */
  setCurrentNode(node) {
    this.currentNode = node;
  }
  /**
    * @param {DialogNode} node 
    */
  addNode(node) {
    if (node instanceof DialogNode) {
      this.nodes.push(node);
    }
    else {
      throw new Error("node must be instance of DialogNode");
    }
  }
}

function dialogGuard(id, startNode) {
  if (id == null || startNode == null) {
    throw new Error(
      "Cannot create Dialog because id or/and startNode is null."
    );
  }
}
