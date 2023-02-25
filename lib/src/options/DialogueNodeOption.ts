import { DialogueNode } from "../nodes/DialogueNode";
import { RequiredVariable } from "../variables/RequiredVariable";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";

export class DialogueNodeOption {
  public isDisabled = false;
  constructor(
    public readonly id: string,
    public readonly text: string,
    public nextNode: DialogueNode | null = null,
    public readonly requiredVariables: RequiredVariable[] = []) {
    if (id == null || text == null) {
      throw new Error(
        `Cannot create DialogNodeOption because id: ${id} or text: ${text} is null.`
      );
    }
    this.id = id;
    this.text = text;
    this.nextNode = nextNode;
    this.requiredVariables = requiredVariables;
    this.isDisabled = false;
  }

  setNextNode(nextNode: DialogueNode | null = null) {
    this.nextNode = nextNode;
  }
}
