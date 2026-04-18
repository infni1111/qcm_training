import { useEffect, useMemo, useState } from 'react';
import { APP_DATA } from './data.js';
import { chapterAggregates, summarize } from './stats.js';

function fmtDate(ms) {
  if (!ms) return '—';
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function pct(rate) {
  if (rate === null || rate === undefined) return '—';
  return `${Math.round(rate * 100)}%`;
}

// Quick lookup: qcm_id -> { chapter, qcm } (from APP_DATA).
function buildQcmIndex() {
  const idx = {};
  for (const ch of APP_DATA.children) {
    for (const q of ch.children) idx[q.id] = { chapter: ch, qcm: q };
  }
  return idx;
}

export default function Stats({ stats, onClose, onReset }) {
  // Default: chapter-level aggregates. Toggle => list of QCMs answered wrong.
  const [showWrongQcms, setShowWrongQcms] = useState(false);
  const qcmIndex = useMemo(buildQcmIndex, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const chapterRows = useMemo(() => chapterAggregates(stats), [stats]);

  const wrongQcmRows = useMemo(() => {
    const out = [];
    for (const ch of stats.children) {
      for (const [qcm_id, qcm_stats] of ch.children) {
        const summary = summarize(qcm_stats);
        if (summary.wrong > 0) {
          const meta = qcmIndex[qcm_id];
          if (meta) out.push({ chapter: ch, qcm: meta.qcm, summary });
        }
      }
    }
    return out;
  }, [stats, qcmIndex]);

  const totals = useMemo(() => {
    let attempts = 0, correct = 0;
    for (const row of chapterRows) {
      attempts += row.attempts;
      correct += row.correct;
    }
    return { attempts, correct, rate: attempts ? correct / attempts : null };
  }, [chapterRows]);

  return (
    <div className="stats-modal" role="dialog" aria-modal="true" aria-label="Stats">
      <div className="stats-backdrop" onClick={onClose} />
      <div className="stats-panel">
        <header className="stats-header">
          <h2>Stats</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        </header>

        <div className="stats-kpis">
          <div className="kpi">
            <div className="kpi-label">Total clicks</div>
            <div className="kpi-value">{totals.attempts}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Correct</div>
            <div className="kpi-value">{totals.correct}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Overall rate</div>
            <div className="kpi-value">{pct(totals.rate)}</div>
          </div>
        </div>

        <div className="stats-controls">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showWrongQcms}
              onChange={(e) => setShowWrongQcms(e.target.checked)}
            />
            Show questions answered wrong
          </label>
          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              if (confirm('Clear all stats? This cannot be undone.')) onReset();
            }}
          >
            Clear
          </button>
        </div>

        <div className="stats-list">
          {!showWrongQcms ? (
            chapterRows.every((r) => r.attempts === 0) ? (
              <div className="empty-msg">
                No stats yet — answer a few questions to populate this list.
              </div>
            ) : (
              chapterRows.map((r) => (
                <div key={r.chapter.id} className="stats-row">
                  <div className="stats-row-title">
                    <span className="stats-row-chapter">{r.chapter.id}</span>
                    <span className="stats-row-qcm">{r.chapter.title}</span>
                  </div>
                  <div className="stats-row-metrics">
                    <span>
                      {r.attempts > 0
                        ? `${r.correct}/${r.attempts} (${pct(r.rate)})`
                        : '—'}
                    </span>
                    {r.attempts > 0 && (
                      <span className="stats-row-last">wrong: {r.wrong}</span>
                    )}
                  </div>
                </div>
              ))
            )
          ) : (
            wrongQcmRows.length === 0 ? (
              <div className="empty-msg">
                No wrong answers recorded — nice work.
              </div>
            ) : (
              wrongQcmRows.map((r) => (
                <div key={r.qcm.id} className="stats-row bad">
                  <div className="stats-row-title">
                    <span className="stats-row-chapter">{r.chapter.id}</span>
                    <span className="stats-row-qcm">{r.qcm.title}</span>
                  </div>
                  <div className="stats-row-metrics">
                    <span>{r.summary.correct}/{r.summary.attempts} ({pct(r.summary.rate)})</span>
                    <span className="stats-row-last">last: {fmtDate(r.summary.last)}</span>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
