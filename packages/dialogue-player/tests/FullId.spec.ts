import { describe, it, expect } from 'vitest';
import { FullId } from "../src/primitives/FullId";

describe('FullId.getEntityType', () => {
  it('dialogue/1 -> dialogue', () => {
    const str = "dialogue/1";
    const fullId = new FullId(str);
    expect(fullId.getEntityType()).toBe('dialogue');
  });

  it('dialogue/1/dialogue-node/1 -> dialogue-node', () => {
    const str = "dialogue/1/dialogue-node/1";
    const fullId = new FullId(str);
    expect(fullId.getEntityType()).toBe('dialogue-node');
  });

  it('dialogue/1/dialogue-node/1/dialogue-node-option/1 -> dialogue-node-option', () => {
    const str = "dialogue/1/dialogue-node/1/dialogue-node-option/1";
    const fullId = new FullId(str);
    expect(fullId.getEntityType()).toBe('dialogue-node-option');
  });

  it('dialogue/1/dialogue-node/1/dialogue-link/1 -> dialogue-link', () => {
    const str = "dialogue/1/dialogue-node/1/dialogue-link/1";
    const fullId = new FullId(str);
    expect(fullId.getEntityType()).toBe('dialogue-link');
  });
});


describe('FullId.id', () => {
  it('dialogue/1 -> 1', () => {
    const str = "dialogue/1";
    const fullId = new FullId(str);
    expect(fullId.id).toBe('1');
  });

  it('dialogue/1/dialogue-node/2 -> dialogue-node', () => {
    const str = "dialogue/1/dialogue-node/2";
    const fullId = new FullId(str);
    expect(fullId.id).toBe('2');
  });

  it('dialogue/1/dialogue-node/2/dialogue-node-option/3 -> dialogue-node-option', () => {
    const str = "dialogue/1/dialogue-node/2/dialogue-node-option/3";
    const fullId = new FullId(str);
    expect(fullId.id).toBe('3');
  });

  it('dialogue/1/dialogue-node/2/dialogue-link/3 -> dialogue-link', () => {
    const str = "dialogue/1/dialogue-node/2/dialogue-link/3";
    const fullId = new FullId(str);
    expect(fullId.id).toBe('3');
  });
});


describe('FullId.getParentFullId', () => {
  it('dialogue/1/dialogue-node/2 -> return dialogue/1', () => {
    const str = "dialogue/1/dialogue-node/2";
    const fullId = new FullId(str);
    const parentFullId = new FullId("dialogue/1")
    expect(fullId.getParentFullId()).toStrictEqual(parentFullId);
  });

  it('dialogue/1/dialogue-node/2/dialogue-node-option/3 -> dialogue/1/dialogue-node/2', () => {
    const str = "dialogue/1/dialogue-node/2/dialogue-node-option/3";
    const fullId = new FullId(str);
    const parentFullId = new FullId("dialogue/1/dialogue-node/2")
    expect(fullId.getParentFullId()).toStrictEqual(parentFullId);
  });

  it('dialogue/1/dialogue-node/2/dialogue-link/3 -> dialogue/1/dialogue-node/2', () => {
    const str = "dialogue/1/dialogue-node/2/dialogue-link/3";
    const fullId = new FullId(str);
    const parentFullId = new FullId("dialogue/1/dialogue-node/2")
    expect(fullId.getParentFullId()).toStrictEqual(parentFullId);
  });
});
