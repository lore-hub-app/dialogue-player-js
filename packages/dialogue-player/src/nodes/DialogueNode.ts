import { DialogueNodeOption, DialogueTextContent, DialogueReferenceContent } from "..";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";
import { FullId } from "../primitives/FullId";
export class DialogueNode {

  public readonly id: FullId;
  public nextNode: DialogueNode | null = null;
  constructor(
    id: string,
    public readonly content: (DialogueTextContent | DialogueReferenceContent)[],
    public options: DialogueNodeOption[] = [],
    public readonly setVariableOnStart: SetVariableOnStart[] = []) {
    this.id = new FullId(id);
  }

  setNextNode(node: DialogueNode | null) {
    this.nextNode = node;
  }

  setOptions(options: Array<DialogueNodeOption>) {
    this.options = options;
  }
}
