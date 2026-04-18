import { describe, it, expect } from 'vitest';
import { APP_DATA, CHAPTERS } from '../data.js';

// These tests lock in the tree shape. Step 1.8 renumbered levels and added the
// 'chapters' wrapper: root(0) -> chapters(1) -> ch(2) -> qcm(3) -> answer(4).
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

  it('every chapter has level 2 and at least one QCM', () => {
    expect(CHAPTERS.length).toBeGreaterThan(0);
    for (const ch of CHAPTERS) {
      expect(ch.level).toBe(2);
      expect(ch.children.length).toBeGreaterThan(0);
    }
  });

  it('every QCM has level 3, a title, an explanation, and at least two answers', () => {
    for (const ch of CHAPTERS) {
      for (const q of ch.children) {
        expect(q.level).toBe(3);
        expect(typeof q.title).toBe('string');
        expect(q.title.length).toBeGreaterThan(0);
        expect(typeof q.explanation).toBe('string');
        expect(q.explanation.length).toBeGreaterThan(20);
        expect(q.children.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('every answer has level 4 and a boolean `correct`', () => {
    for (const ch of CHAPTERS) {
      for (const q of ch.children) {
        for (const a of q.children) {
          expect(a.level).toBe(4);
          expect(typeof a.text).toBe('string');
          expect(typeof a.correct).toBe('boolean');
        }
      }
    }
  });

  it('every QCM has at least one correct answer (no impossible question)', () => {
    for (const ch of CHAPTERS) {
      for (const q of ch.children) {
        const n = q.children.filter((a) => a.correct).length;
        expect(n, `QCM ${q.id} has no correct answer`).toBeGreaterThan(0);
      }
    }
  });

  it('all chapter, QCM and answer IDs are unique', () => {
    const seen = new Set();
    const addUnique = (id) => {
      expect(seen.has(id), `duplicate id: ${id}`).toBe(false);
      seen.add(id);
    };
    for (const ch of CHAPTERS) {
      addUnique(ch.id);
      for (const q of ch.children) {
        addUnique(q.id);
        for (const a of q.children) addUnique(a.id);
      }
    }
  });
});
