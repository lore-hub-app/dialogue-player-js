
import { MetaSchema } from './meta-data/MetaSchema';
import { DialogueNode } from './nodes/DialogueNode'
import { FullId } from './primitives/FullId';
import { BooleanVariable } from './variables/BooleanVariable';
import { SetVariableOnStart } from './variables/SerVariableOnStart';
import { IEvent } from './events/IEvent';
import { EventTypes } from './events/EventTypes';

export class Dialogue {

  public nodes: DialogueNode[] = [];
  public currentNode: DialogueNode | null;
  public readonly id: FullId;
  public callbacks: IEvent[] = [];
  constructor(
    id: string,
    public readonly startNode: DialogueNode,
    public readonly variables: BooleanVariable[],
    public readonly metaSchema: MetaSchema[]) {
    this.id = new FullId(id);
    this.currentNode = startNode;
  }

  /**
   * Allows you to register callbacks for different event type.
   * If Event is 'currentNodeChange' will fire callback right away to provide with current node id.
   */
  on(eventName: EventTypes, callback: (node: DialogueNode | null) => void) {
    this.callbacks.push({
      eventName, callback
    })
    if (eventName === 'currentNodeChange') {
      callback(this.currentNode);
    }
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
    this.callbacks
      .filter(c => c.eventName == 'currentNodeChange')
      .forEach(c => {
        c.callback(node);
      });
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
