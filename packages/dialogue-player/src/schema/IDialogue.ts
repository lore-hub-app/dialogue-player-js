import { FullIdDialogue } from "../primitives/FullId";

export interface IDialogue {
  type: "@lorehub/dialogue",
  apiVersion: "2.0.0",
  id: FullIdDialogue,
  name: string
}
