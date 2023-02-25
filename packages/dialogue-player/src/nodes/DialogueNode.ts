import { DialogueNodeOption, DialogueTextContent, DialogueReferenceContent } from "..";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";
import { FullId } from "../primitives/FullId";
export class DialogueNode {

  public readonly id: FullId;

  constructor(
    id: string,
    public readonly content: Array<DialogueTextContent | DialogueReferenceContent>,
    public nextNode: DialogueNode | null = null,
    public options: Array<DialogueNodeOption> = [],
    public readonly setVariableOnStart: Array<SetVariableOnStart> = []) {
    this.id = new FullId(id);
  }

  setNextNode(node: DialogueNode | null) {
    this.nextNode = node;
  }

  setOptions(options: Array<DialogueNodeOption>) {
    this.options = options;
  }
}
