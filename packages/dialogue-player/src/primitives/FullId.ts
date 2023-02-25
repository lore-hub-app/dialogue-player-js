export class FullId {

  constructor(public readonly fullValue: string) {
    if (fullValue == null) throw Error('Cannot create full id if value is null');
  }

  /** 
   * Will Return Id of the Entity itself.
   */
  get id(): string {
    const split = this.fullValue.split('/');
    console.log(split)
    return split[split.length - 1];
  }

  /**
   * Will return Entity Type, ex: DialogNode, NodeOption
   */
  public getEntityType(): 'dialogue' | 'dialogue-node' | 'dialogue-link' | 'dialogue-node-option' {
    const split = this.fullValue.split('/');
    const typeStr = split[split.length - 2];
    if (typeStr == "dialogue-node") return 'dialogue-node';
    else if (typeStr == "dialogue-node-option") return 'dialogue-node-option';
    else if (typeStr == "dialogue") return 'dialogue';
    else if (typeStr == "dialogue-link") return 'dialogue-link';
    throw new Error(`GetEntityType. Not type for ${typeStr}`);
  }

  public equal(other: FullId) {
    return this.fullValue === other.fullValue;
  }

  public getParentFullId(): FullId {
    if (this.getEntityType() === 'dialogue') throw new Error("Cannot return parent of Dialogue");
    if (this.getEntityType() === 'dialogue-node') {
      const newStr = this.fullValue.replace(`/dialogue-node/${this.id}`, "");
      return new FullId(newStr);
    }
    if (this.getEntityType() === 'dialogue-node-option') {
      const newStr = this.fullValue.replace(`/dialogue-node-option/${this.id}`, "");
      return new FullId(newStr);
    }
    if (this.getEntityType() === 'dialogue-link') {
      const newStr = this.fullValue.replace(`/dialogue-link/${this.id}`, "");
      return new FullId(newStr);
    }
    throw new Error(`not implemented for ${this.getEntityType()}`);
  }
}
