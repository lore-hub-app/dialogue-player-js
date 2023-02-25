import { FullIdDialogueNodeOption } from "../primitives/FullId"

export interface IDialogueNodeOption {
  type: "@lorehub/dialogue-node-option";
  apiVersion: "2.0.0";
  id: FullIdDialogueNodeOption;
  text: string;
  requiredVariables: { variableId: string; value: string }[]
}
