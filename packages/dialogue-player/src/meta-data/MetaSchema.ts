export class MetaSchema {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly schemaType: 'text' | 'integer'
  ) { }
}
