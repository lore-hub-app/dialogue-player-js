import DialogNode from "./DialogNode";

export default class Dialog {
  /**
   * @param {String} id
   * @param {DialogNode} startNode
   */
  constructor(id, startNode) {
    if (id == null || startNode == null) {
      throw new Error("Cannot create Dialog because id or/and startNode is null.");
    }

    this.id = id;
    this.startNode = startNode;
    this._currnetNode = startNode;

    startNode.subscribe(this);
  }

  /**
   * @returns {DialogNode}
   */
  get currentNode() {
    return this._currnetNode;
  }

  /**
   * @returns {boolean}
   */
  get finished() {
    if (this._currnetNode.nextNode == null) return true;
    return false;
  }

  /**
   * @param {DialogNode} nextNode
   */
  onNext(nextNode) {
    this._currnetNode.unsubscribe(this);
    nextNode.subscribe(this);
    this._currnetNode = nextNode;
  }
}
