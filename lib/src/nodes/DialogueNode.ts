import { DialogueNodeOption, DialogueTextContent, DialogueReferenceContent } from "..";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";

export class DialogueNode {
  constructor(
    public readonly id: string,
    public readonly content: Array<DialogueTextContent | DialogueReferenceContent>,
    public nextNode: DialogueNode | null = null,
    public options: Array<DialogueNodeOption> = [],
    public readonly setVariableOnStart: Array<SetVariableOnStart> = []) {
  }

  setNextNode(node: DialogueNode | null) {
    this.nextNode = node;
  }

  setOptions(options: Array<DialogueNodeOption>) {
    this.options = options;
  }
}
