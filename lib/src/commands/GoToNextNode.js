import { Command } from "./Command";

export class GoToNextNode extends Command {

  constructor(dialog, nextNode) {
    super();
    this.dialog = dialog;
    this.nextNode = nextNode;
  }

  execute() {
    this.dialog.setCurrentNode(this.nextNode)
  }

  toString() {
    if (this.nextNode == null) {
      return GoToNextNode.name + ' empty'
    }
    return GoToNextNode.name + ' ' + this.nextNode.id
  }
}
