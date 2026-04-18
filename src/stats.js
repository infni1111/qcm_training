// Stats data: mirrors APP_DATA shape. At level 2, each entry is a list
// [qcm_id, qcm_stats] where qcm_stats = [[timestamp_ms, value], ...].
// value: 1 = correct answer clicked, 0 = wrong answer clicked.
//
// Persisted in localStorage under LS_KEY. Schema version lets us migrate
// gracefully when APP_DATA changes (new chapters/QCMs are merged in with
// empty qcm_stats while preserving existing history).

import { APP_DATA } from './data.js';

const LS_KEY = 'ccna_stats_v1';
const SCHEMA_VERSION = 1;

export function buildEmptyStats() {
  return {
    version: SCHEMA_VERSION,
    level: 0,
    id: 'root',
    title: 'CCNA Training — Stats',
    children: APP_DATA.children.map((ch) => ({
      level: 1,
      id: ch.id,
      title: ch.title,
      children: ch.children.map((q) => [q.id, []]),
    })),
  };
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

// Ensure every chapter/QCM currently in APP_DATA has a slot in the saved stats.
// New ones get empty qcm_stats. Known ones keep their saved history.
// Removed QCMs are dropped (they're no longer in APP_DATA).
function mergeWithCurrent(saved) {
  const known = {};
  for (const ch of saved?.children ?? []) {
    for (const entry of ch?.children ?? []) {
      if (Array.isArray(entry) && entry.length === 2) {
        known[entry[0]] = entry[1] || [];
      }
    }
  }
  const fresh = buildEmptyStats();
  for (const ch of fresh.children) {
    for (const entry of ch.children) {
      const id = entry[0];
      if (known[id]) entry[1] = known[id];
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

// Append an answer event to a QCM. Returns a NEW stats object (immutable update).
export function recordAnswer(stats, qcm_id, value /* 0 | 1 */) {
  const next = structuredClone(stats);
  for (const ch of next.children) {
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
  for (const ch of stats.children) {
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

// "Bad score" predicate used by the filter in <Stats>.
// Defaults: at least 2 clicks recorded AND success rate < 0.5.
export function isBad(summary, { minAttempts = 2, threshold = 0.5 } = {}) {
  if (summary.attempts < minAttempts) return false;
  return summary.rate !== null && summary.rate < threshold;
}

export function clearStats() {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_KEY);
  return buildEmptyStats();
}
