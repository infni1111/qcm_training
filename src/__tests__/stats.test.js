import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildEmptyStats,
  loadStats,
  saveStats,
  recordAnswer,
  getQcmStats,
  summarize,
  isBad,
  chapterAggregates,
  forEachQcmStats,
  clearStats,
} from '../stats.js';
import { CHAPTERS } from '../data.js';

describe('buildEmptyStats', () => {
  it('returns the root -> stats -> chapters structure with schema v2', () => {
    const s = buildEmptyStats();
    expect(s.version).toBe(2);
    expect(s.level).toBe(0);
    expect(s.id).toBe('root');
    expect(s.children).toHaveLength(1);
    expect(s.children[0].id).toBe('stats');
    expect(s.children[0].level).toBe(1);
  });

  it('mirrors every chapter and QCM from APP_DATA', () => {
    const s = buildEmptyStats();
    const chIds = s.children[0].children.map((c) => c.id);
    expect(chIds).toEqual(CHAPTERS.map((c) => c.id));
    for (const [i, ch] of s.children[0].children.entries()) {
      expect(ch.level).toBe(2);
      expect(ch.children.length).toBe(CHAPTERS[i].children.length);
    }
  });

  it('each QCM entry is [qcm_id, []] (empty events list)', () => {
    const s = buildEmptyStats();
    for (const ch of s.children[0].children) {
      for (const entry of ch.children) {
        expect(Array.isArray(entry)).toBe(true);
        expect(entry).toHaveLength(2);
        expect(typeof entry[0]).toBe('string');
        expect(Array.isArray(entry[1])).toBe(true);
        expect(entry[1]).toHaveLength(0);
      }
    }
  });
});

describe('recordAnswer', () => {
  it('appends [timestamp_ms, value] to the matching QCM', () => {
    const qcmId = CHAPTERS[0].children[0].id;
    const before = Date.now();
    const next = recordAnswer(buildEmptyStats(), qcmId, 1);
    const after = Date.now();

    const events = getQcmStats(next, qcmId);
    expect(events).toHaveLength(1);
    expect(events[0][1]).toBe(1);
    expect(events[0][0]).toBeGreaterThanOrEqual(before);
    expect(events[0][0]).toBeLessThanOrEqual(after);
  });

  it('is immutable — the input object is not modified', () => {
    const s = buildEmptyStats();
    const qcmId = CHAPTERS[0].children[0].id;
    recordAnswer(s, qcmId, 1);
    expect(getQcmStats(s, qcmId)).toHaveLength(0);
  });

  it('returns a clone unchanged when qcm_id is unknown', () => {
    const s = buildEmptyStats();
    const next = recordAnswer(s, 'does_not_exist', 1);
    expect(next).not.toBe(s);
    let total = 0;
    forEachQcmStats(next, ({ qcm_stats }) => {
      total += qcm_stats.length;
    });
    expect(total).toBe(0);
  });

  it('accumulates multiple events on the same QCM', () => {
    const qcmId = CHAPTERS[0].children[0].id;
    let s = buildEmptyStats();
    s = recordAnswer(s, qcmId, 1);
    s = recordAnswer(s, qcmId, 0);
    s = recordAnswer(s, qcmId, 1);
    expect(getQcmStats(s, qcmId)).toHaveLength(3);
  });
});

describe('summarize', () => {
  it('returns a zeroed summary for an empty list', () => {
    expect(summarize([])).toEqual({
      attempts: 0, correct: 0, wrong: 0, rate: null, last: null,
    });
  });

  it('computes rate = correct / attempts and tracks the latest timestamp', () => {
    const s = summarize([[10, 1], [20, 0], [30, 1], [40, 1]]);
    expect(s.attempts).toBe(4);
    expect(s.correct).toBe(3);
    expect(s.wrong).toBe(1);
    expect(s.rate).toBeCloseTo(0.75);
    expect(s.last).toBe(40);
  });

  it('ignores non-1 values as wrong (rate = 0 on all-zero)', () => {
    const s = summarize([[1, 0], [2, 0]]);
    expect(s.correct).toBe(0);
    expect(s.rate).toBe(0);
  });
});

describe('isBad', () => {
  it('needs at least 2 attempts by default', () => {
    expect(isBad(summarize([[1, 0]]))).toBe(false);
  });

  it('flags rate < 0.5 with >= 2 attempts', () => {
    expect(isBad(summarize([[1, 0], [2, 0]]))).toBe(true);
  });

  it('does not flag rate >= 0.5', () => {
    expect(isBad(summarize([[1, 1], [2, 0]]))).toBe(false); // 50% — not strict <
  });

  it('respects custom threshold and minAttempts', () => {
    const summary = summarize([[1, 1], [2, 0], [3, 0]]); // ~33%
    expect(isBad(summary, { threshold: 0.2 })).toBe(false); // 33% >= 20%
    expect(isBad(summary, { minAttempts: 10 })).toBe(false); // not enough attempts
  });
});

describe('chapterAggregates', () => {
  it('returns one row per chapter', () => {
    const rows = chapterAggregates(buildEmptyStats());
    expect(rows).toHaveLength(CHAPTERS.length);
  });

  it('empty chapters have attempts=0 and rate=null', () => {
    const rows = chapterAggregates(buildEmptyStats());
    for (const r of rows) {
      expect(r.attempts).toBe(0);
      expect(r.correct).toBe(0);
      expect(r.rate).toBeNull();
    }
  });

  it('sums attempts/correct across the chapter', () => {
    const ch = CHAPTERS[0];
    const q1 = ch.children[0].id;
    const q2 = ch.children[1].id;
    let s = buildEmptyStats();
    s = recordAnswer(s, q1, 1);
    s = recordAnswer(s, q1, 0);
    s = recordAnswer(s, q2, 1);
    const row = chapterAggregates(s).find((r) => r.chapter.id === ch.id);
    expect(row.attempts).toBe(3);
    expect(row.correct).toBe(2);
    expect(row.wrong).toBe(1);
    expect(row.rate).toBeCloseTo(2 / 3);
  });
});

describe('forEachQcmStats', () => {
  it('visits every QCM entry exactly once', () => {
    const s = buildEmptyStats();
    let count = 0;
    forEachQcmStats(s, () => {
      count++;
    });
    const totalQcms = CHAPTERS.reduce((n, c) => n + c.children.length, 0);
    expect(count).toBe(totalQcms);
  });
});

describe('localStorage persistence', () => {
  beforeEach(() => localStorage.clear());

  it('loadStats() returns an empty tree when storage is empty', () => {
    const s = loadStats();
    expect(s.version).toBe(2);
    expect(chapterAggregates(s).every((r) => r.attempts === 0)).toBe(true);
  });

  it('saveStats + loadStats round-trip events', () => {
    const qcmId = CHAPTERS[0].children[0].id;
    let s = buildEmptyStats();
    s = recordAnswer(s, qcmId, 1);
    saveStats(s);
    const loaded = loadStats();
    expect(getQcmStats(loaded, qcmId)).toHaveLength(1);
    expect(getQcmStats(loaded, qcmId)[0][1]).toBe(1);
  });

  it('tolerates corrupt storage and falls back to an empty tree', () => {
    localStorage.setItem('ccna_stats_v1', '{not-json');
    const s = loadStats();
    expect(s.version).toBe(2);
    expect(chapterAggregates(s).every((r) => r.attempts === 0)).toBe(true);
  });

  it('clearStats() wipes storage and returns an empty tree', () => {
    const qcmId = CHAPTERS[0].children[0].id;
    let s = buildEmptyStats();
    s = recordAnswer(s, qcmId, 1);
    saveStats(s);
    clearStats();
    expect(getQcmStats(loadStats(), qcmId)).toHaveLength(0);
  });
});

describe('mergeWithCurrent (via loadStats)', () => {
  beforeEach(() => localStorage.clear());

  it('migrates a pre-wrapper (v1-shaped) saved tree without losing events', () => {
    // Simulate the old shape: root.children = [chapter, chapter, ...] directly.
    const v1 = {
      version: 1,
      level: 0,
      id: 'root',
      title: 'CCNA Training',
      children: CHAPTERS.map((ch) => ({
        level: 1,
        id: ch.id,
        title: ch.title,
        children: ch.children.map((q) => [q.id, []]),
      })),
    };
    const qcmId = CHAPTERS[0].children[0].id;
    v1.children[0].children[0][1].push([12345, 1], [12346, 0]);
    localStorage.setItem('ccna_stats_v1', JSON.stringify(v1));

    const loaded = loadStats();
    expect(loaded.version).toBe(2);
    expect(loaded.children[0].id).toBe('stats');
    expect(getQcmStats(loaded, qcmId)).toEqual([[12345, 1], [12346, 0]]);
  });

  it('drops events for QCMs that no longer exist in APP_DATA', () => {
    const v1 = {
      version: 1,
      level: 0,
      id: 'root',
      children: [
        {
          level: 1,
          id: 'ghost_chapter',
          children: [['ghost_qcm', [[1, 0]]]],
        },
      ],
    };
    localStorage.setItem('ccna_stats_v1', JSON.stringify(v1));
    const loaded = loadStats();
    // ghost_qcm is not in APP_DATA — it should not appear anywhere.
    let found = 0;
    forEachQcmStats(loaded, ({ qcm_id }) => {
      if (qcm_id === 'ghost_qcm') found++;
    });
    expect(found).toBe(0);
  });
});
