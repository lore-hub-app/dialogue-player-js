export class BooleanVariable {
  public currentValue: string;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly defaultValue: string) {
    this.id = id;
    this.name = name;
    this.defaultValue = defaultValue;
    this.currentValue = defaultValue;
  }

  changeCurrentValue(value: string) {
    this.currentValue = value;
  }
}
