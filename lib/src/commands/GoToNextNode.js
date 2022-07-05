import { DialogueNodeOption } from "../options/DialogueNodeOption";
import { DialogueNode } from '../nodes/DialogueNode';
import { Command } from "./Command";

export class GoToNextNode extends Command {

  constructor(dialog, selected) {
    super();
    this.dialog = dialog;
    this.selected = selected;
  }

  execute() {
    this.dialog.setCurrentNode(this.selected.nextNode)
  }

  toString() {
    if (this.selected.nextNode == null) {
      return GoToNextNode.name + ' empty'
    }
    return GoToNextNode.name + ' ' + this.selected.nextNode.id
  }
}
