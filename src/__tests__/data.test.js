import { describe, it, expect } from 'vitest';
import { APP_DATA, CHAPTERS } from '../data.js';

// These tests lock in the flashcard tree shape:
//   root(0) -> chapters(1) -> chapter(2) -> card(3).
// A card is { id, concept, explanation } with NO answers (self-assessment app).
describe('APP_DATA shape', () => {
  it('root is level 0 with id "root"', () => {
    expect(APP_DATA.level).toBe(0);
    expect(APP_DATA.id).toBe('root');
    expect(typeof APP_DATA.title).toBe('string');
  });

  it('root has exactly one child: the chapters wrapper at level 1', () => {
    expect(APP_DATA.children).toHaveLength(1);
    expect(APP_DATA.children[0].id).toBe('chapters');
    expect(APP_DATA.children[0].level).toBe(1);
  });

  it('CHAPTERS aliases APP_DATA.children[0].children', () => {
    expect(CHAPTERS).toBe(APP_DATA.children[0].children);
  });

  it('every chapter has level 2 and at least one card', () => {
    expect(CHAPTERS.length).toBeGreaterThan(0);
    for (const ch of CHAPTERS) {
      expect(ch.level).toBe(2);
      expect(ch.children.length).toBeGreaterThan(0);
    }
  });

  it('every card has level 3, a non-empty concept and explanation, and no answers', () => {
    for (const ch of CHAPTERS) {
      for (const c of ch.children) {
        expect(c.level).toBe(3);
        expect(typeof c.concept).toBe('string');
        expect(c.concept.length).toBeGreaterThan(0);
        expect(typeof c.explanation).toBe('string');
        expect(c.explanation.length).toBeGreaterThan(0);
        expect(c.children).toBeUndefined();
      }
    }
  });

  it('all chapter and card IDs are unique', () => {
    const seen = new Set();
    const addUnique = (id) => {
      expect(seen.has(id), `duplicate id: ${id}`).toBe(false);
      seen.add(id);
    };
    for (const ch of CHAPTERS) {
      addUnique(ch.id);
      for (const c of ch.children) addUnique(c.id);
    }
  });

  it('contains all 81 concepts from the cisco table', () => {
    const total = CHAPTERS.reduce((n, ch) => n + ch.children.length, 0);
    expect(total).toBe(81);
  });
});
