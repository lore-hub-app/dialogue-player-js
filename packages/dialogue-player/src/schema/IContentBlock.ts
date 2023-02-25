export interface IContentBlock {
  type: "@lorehub/content-block",
  apiVersion: "1.0.0",
  id: string,
  content: (IContentBlockText | IContentBlockReference)[]
}


export interface IContentBlockText {
  text: string
}

export interface IContentBlockReference {
  text: string | null
  documentId: string | null
}


export function isContentBlockText(content: object): content is IContentBlockText {
  return 'text' in content;
}

export function isContentBlockReference(content: object): content is IContentBlockReference {
  return 'text' in content && 'documentId' in content;
}

