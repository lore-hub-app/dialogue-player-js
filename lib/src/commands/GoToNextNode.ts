import { DialogueNodeOption } from "../options/DialogueNodeOption";
import { DialogueNode } from '../nodes/DialogueNode';
import { Command } from "./Command";
import { Dialogue } from "../Dialogue";

export class GoToNextNode implements Command {

  constructor(
    public readonly dialog: Dialogue,
    public readonly selected: DialogueNode) {
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
