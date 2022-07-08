import { convertExportDataToDialogue } from "../src/converters/convertExportDataToDialogue";
import json from './examples/scene-01.json';
import { it, expect } from 'vitest';

it("Json Example should be converted", () => {
  const dialogue = convertExportDataToDialogue(json);

  expect(dialogue.id).toBe("8d874a95-1a95-4101-a868-7b358a286a85");
  expect(dialogue.startNode.id).toBe("2b6490d3-f8a9-440f-93b8-a59e30bbb4c7");
  
  // first node has 3 options
  expect(dialogue.startNode.nextNode).toBe(null);
  expect(dialogue.startNode.options.length).toBe(3);
  // fire node's options have correct next node
  expect(dialogue.startNode.options[0].nextNode.id).toBe("06becc2c-69d3-4c40-95b6-341c1dcb6652")
  expect(dialogue.startNode.options[1].nextNode.id).toBe("fcd9d8fd-49d7-483a-81c9-1f3e4df9109a")
  expect(dialogue.startNode.options[2].nextNode.id).toBe("0b037bf5-c308-4700-b03e-41a6e73d8d72")
})
