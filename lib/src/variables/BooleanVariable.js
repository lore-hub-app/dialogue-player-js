export class BooleanVariable{
  constructor(id, name, defaultValue){
    this.id = id;
    this.name = name;
    this.defaultValue = defaultValue;
    this.currentValue = defaultValue;
  }

  changeCurrentValue(value){
    this.currentValue = value;
  }
}
