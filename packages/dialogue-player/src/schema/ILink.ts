import { FullIdDialogue, FullIdDialogueLink, FullIdDialogueNode, FullIdDialogueNodeOption } from "../primitives/FullId";

export interface ILink {
  type: "@lorehub/dialogue-link",
  apiVersion: "1.0.0",
  id: `dialogue/${string}/dialogue-link/${string}`,
  from: FullIdDialogue | FullIdDialogueNode | FullIdDialogueNodeOption | FullIdDialogueLink
  to: FullIdDialogue | FullIdDialogueNode | FullIdDialogueNodeOption | FullIdDialogueLink
}

