import { FullIdDialogueNode } from "../primitives/FullId";

export interface IDialogueNode {
  type: "@lorehub/dialogue-node";
  apiVersion: "2.0.0";
  id: FullIdDialogueNode;
  optionsIds: string[];
  setVariableOnStart: { variableId: string, value: string }[];
  metaData: { metaSchemaId: string; metaSchemaValue: string }[];
}
