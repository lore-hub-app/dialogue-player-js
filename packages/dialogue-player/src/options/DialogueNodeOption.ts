import { DialogueNode } from "../nodes/DialogueNode";
import { FullId } from "../primitives/FullId";
import { RequiredVariable } from "../variables/RequiredVariable";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";

export class DialogueNodeOption {
  public readonly id: FullId;

  public isDisabled = false;
  public nextNode: DialogueNode | null = null;
  constructor(
    id: string,
    public readonly text: string,
    public readonly requiredVariables: RequiredVariable[] = []) {

    if (id == null || text == null) {
      throw new Error(`Cannot create DialogNodeOption because id: ${id} or text: ${text} is null.`);
    }

    this.id = new FullId(id);
    this.text = text;
    this.requiredVariables = requiredVariables;
    this.isDisabled = false;
  }

  setNextNode(nextNode: DialogueNode | null = null) {
    this.nextNode = nextNode;
  }
}
