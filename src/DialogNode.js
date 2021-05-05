import DialogTextContent from "./DialogTextContent";
export default class DialogNode {
  /**
   * @param {String} id
   * @param {Array<DialogTextContent> | DialogTextContent} content
   * @param {DialogNode|null} nextNode
   */
  constructor(id, content, nextNode = null) {
    if (id == null || content == null) {
      throw new Error(
        `Cannot create DialogNode because id: ${id} or content: ${content} is null.`
      );
    }

    this.id = id;
    this.nextNode = nextNode;

    if (content.length == null) {
      this.content = [content];
    } else {
      this.content = content;
    }

    this.subscribers = [];
  }

  /**
   * @throws error when next node is null.
   */
  goNext() {
    if (this.nextNode == null) {
      throw new Error("NextNode is null, so I cannot go to next one.");
    }

    this.subscribers.forEach(observer => {
      observer.onNext(this.nextNode);
    });
  }

  subscribe(subscriber) {
    if (subscriber.onNext == null) {
      throw new Error(
        "You cannot subscribe because 'onNext' function is not defined."
      );
    }
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const toRemoveIndex = this.subscribers.findIndex(e => e === subscriber);
    if (toRemoveIndex > -1) {
      this.subscribers.splice(toRemoveIndex, 1);
    }
  }
}
