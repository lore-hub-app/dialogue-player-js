import { BooleanVariable } from "..";
import { DialogueNode } from "../nodes/DialogueNode";
import { FullId } from "../primitives/FullId";
import { RequiredVariable } from "../variables/RequiredVariable";
import { SetVariableOnStart } from "../variables/SerVariableOnStart";

export class DialogueNodeOption {
  public readonly id: FullId;

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
  }

  setNextNode(nextNode: DialogueNode | null = null) {
    this.nextNode = nextNode;
  }

  isDisabled(variables: BooleanVariable[]): boolean {
    for (const reqVariable of this.requiredVariables) {
      const checkVar = variables.find(v => v.id === reqVariable.variableId);
      if (checkVar == null) throw new Error("Cannot apply options status because variable to check is null");
      return reqVariable.value !== checkVar.currentValue;
    }
    return false;
  }
}
