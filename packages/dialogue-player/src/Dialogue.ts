
import { MetaSchema } from './meta-data/MetaSchema';
import { DialogueNode } from './nodes/DialogueNode'
import { FullId } from './primitives/FullId';
import { BooleanVariable } from './variables/BooleanVariable';
import { SetVariableOnStart } from './variables/SerVariableOnStart';

export class Dialogue {

  public nodes: DialogueNode[] = [];
  public currentNode: DialogueNode | null;
  public readonly id: FullId;
  constructor(
    id: string,
    public readonly startNode: DialogueNode,
    public readonly variables: BooleanVariable[],
    public readonly metaSchema: MetaSchema[]) {
    this.id = new FullId(id);
    this.currentNode = startNode;
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
