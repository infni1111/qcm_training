// Stats tree (mirrors APP_DATA shape, siblings under root):
//   root (L0)
//   └── stats (L1)                            <-- new wrapper (sibling of 'chapters')
//       └── chapter (L2)
//           └── [qcm_id, qcm_stats] (L3)      <-- list of [ts_ms, value]
//
// value: 1 = correct answer clicked, 0 = wrong answer clicked.
// Persisted in localStorage under LS_KEY.
// Schema version is bumped (2) because the tree shape changed; older saved
// histories are merged leaf-by-leaf so no data is lost.

import { CHAPTERS } from './data.js';

const LS_KEY = 'ccna_stats_v1';
const SCHEMA_VERSION = 2;

export function buildEmptyStats() {
  return {
    version: SCHEMA_VERSION,
    level: 0,
    id: 'root',
    title: 'CCNA Training',
    children: [
      {
        level: 1,
        id: 'stats',
        title: 'Stats',
        children: CHAPTERS.map((ch) => ({
          level: 2,
          id: ch.id,
          title: ch.title,
          children: ch.children.map((q) => [q.id, []]),
        })),
      },
    ],
  };
}

// Chapters inside the stats tree: stats.children[0] is the 'stats' wrapper.
function statsChapters(stats) {
  return stats?.children?.[0]?.children ?? [];
}

export function loadStats() {
  if (typeof localStorage === 'undefined') return buildEmptyStats();
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return buildEmptyStats();
    return mergeWithCurrent(JSON.parse(raw));
  } catch (e) {
    console.warn('stats: bad data in localStorage, resetting', e);
    return buildEmptyStats();
  }
}

// Walk any saved tree shape (v1 flat, v2 wrapped, or anything with matching
// leaves) and collect all [qcm_id, events_list] pairs. Then merge into a fresh
// empty tree so we never lose history when the schema changes.
function mergeWithCurrent(saved) {
  const known = {};
  const walk = (node) => {
    if (
      Array.isArray(node) &&
      node.length === 2 &&
      typeof node[0] === 'string' &&
      Array.isArray(node[1])
    ) {
      known[node[0]] = node[1];
      return;
    }
    if (node && Array.isArray(node.children)) {
      for (const child of node.children) walk(child);
    }
  };
  walk(saved);

  const fresh = buildEmptyStats();
  for (const ch of statsChapters(fresh)) {
    for (const entry of ch.children) {
      if (known[entry[0]]) entry[1] = known[entry[0]];
    }
  }
  return fresh;
}

export function saveStats(stats) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('stats: failed to save', e);
  }
}

// Append an answer event for a QCM. Returns a new stats object.
export function recordAnswer(stats, qcm_id, value /* 0 | 1 */) {
  const next = structuredClone(stats);
  for (const ch of statsChapters(next)) {
    for (const entry of ch.children) {
      if (entry[0] === qcm_id) {
        entry[1].push([Date.now(), value]);
        return next;
      }
    }
  }
  return next;
}

export function getQcmStats(stats, qcm_id) {
  for (const ch of statsChapters(stats)) {
    for (const entry of ch.children) {
      if (entry[0] === qcm_id) return entry[1];
    }
  }
  return [];
}

// Aggregates for a single qcm_stats list.
export function summarize(qcm_stats) {
  const attempts = qcm_stats.length;
  if (!attempts) return { attempts: 0, correct: 0, wrong: 0, rate: null, last: null };
  const correct = qcm_stats.filter(([, v]) => v === 1).length;
  return {
    attempts,
    correct,
    wrong: attempts - correct,
    rate: correct / attempts,
    last: qcm_stats[qcm_stats.length - 1][0],
  };
}

// "Bad score" predicate (library helper; the current <Stats> filter uses
// `wrong > 0` directly, but callers may prefer a stricter cutoff).
// Defaults: at least 2 attempts AND rate strictly below 0.5.
export function isBad(summary, { minAttempts = 2, threshold = 0.5 } = {}) {
  if (summary.attempts < minAttempts) return false;
  return summary.rate !== null && summary.rate < threshold;
}

// Per-chapter aggregate. Returns [{ chapter, attempts, correct, wrong, rate }].
export function chapterAggregates(stats) {
  return statsChapters(stats).map((ch) => {
    let attempts = 0, correct = 0;
    for (const [, qcm_stats] of ch.children) {
      for (const [, v] of qcm_stats) {
        attempts++;
        if (v === 1) correct++;
      }
    }
    return {
      chapter: ch,
      attempts,
      correct,
      wrong: attempts - correct,
      rate: attempts ? correct / attempts : null,
    };
  });
}

// Iterator helper: yield { chapter, qcm_id, qcm_stats } for each stats leaf.
export function forEachQcmStats(stats, fn) {
  for (const ch of statsChapters(stats)) {
    for (const [qcm_id, qcm_stats] of ch.children) {
      fn({ chapter: ch, qcm_id, qcm_stats });
    }
  }
}

export function clearStats() {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_KEY);
  return buildEmptyStats();
}
