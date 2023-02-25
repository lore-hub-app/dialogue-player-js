
import { DialogueNode } from './nodes/DialogueNode'
import { BooleanVariable } from './variables/BooleanVariable';
import { SetVariableOnStart } from './variables/SerVariableOnStart';

export class Dialogue {

  public nodes: DialogueNode[] = [];
  public currentNode: DialogueNode | null;

  constructor(
    public readonly id: string,
    public readonly startNode: DialogueNode,
    public readonly variables: BooleanVariable[]) {

    this.currentNode = startNode;
    applyOptionStatus(this.variables, this.currentNode)
  }

  get isFinished() {
    return this.currentNode == null;
  }

  setVariable(setVariable: SetVariableOnStart) {
    const needed = this.variables.find(v => v.id === setVariable.variableId);
    if (needed == null) throw new Error("Cannot set variable because it is null");
    needed.changeCurrentValue(setVariable.value);
  }

  setCurrentNode(node: DialogueNode | null) {
    this.currentNode = node;
    if (node == null) return;
    // apply variables on next node start
    for (const setVariable of node.setVariableOnStart) {
      this.setVariable(setVariable);
    }
    applyOptionStatus(this.variables, node)
  }

  addNode(node: DialogueNode) {
    if (node instanceof DialogueNode) {
      this.nodes.push(node);
    }
    else {
      throw new Error("node must be instance of DialogueNode");
    }
  }
}

function applyOptionStatus(variables: BooleanVariable[], node: DialogueNode) {
  for (const option of node.options) {
    for (const reqVariable of option.requiredVariables) {
      const checkVar = variables.find(v => v.id === reqVariable.variableId);
      if (checkVar == null) throw new Error("Cannot apply options status because variable to check is null");
      if (reqVariable.value !== checkVar.currentValue) {
        option.isDisabled = true;
      }
    }
  }
}
