import { convertDataToDialogue } from "../src/converters/convertDataToDialogue";
import json from './examples/scene-01.json';
import { it, expect } from 'vitest';

it("Json Example should be converted", () => {
  const dialogue = convertDataToDialogue(json);
  expect(dialogue.id).toBe("8d874a95-1a95-4101-a868-7b358a286a85");
  expect(dialogue.startNode.id).toBe("2b6490d3-f8a9-440f-93b8-a59e30bbb4c7");
})
