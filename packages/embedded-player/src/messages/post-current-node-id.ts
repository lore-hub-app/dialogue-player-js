import { DialogueNode } from "@lorehub/dialogue-player";

export function postCurrentNodeId(node: DialogueNode | null) {
  window.parent.postMessage({
    message: 'dialogue-player-current-node-id',
    data: node?.id.fullValue ?? null
  }, "*");
}
