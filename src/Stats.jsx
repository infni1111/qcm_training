import { useEffect, useMemo, useState } from 'react';
import { APP_DATA } from './data.js';
import { clearStats, isBad, summarize } from './stats.js';

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

// Quick lookup: qcm_id -> qcm object (from APP_DATA).
function buildQcmIndex() {
  const idx = {};
  for (const ch of APP_DATA.children) {
    for (const q of ch.children) idx[q.id] = q;
  }
  return idx;
}

export default function Stats({ stats, onClose, onReset }) {
  const [onlyBad, setOnlyBad] = useState(false);
  const qcmIndex = useMemo(buildQcmIndex, []);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Flatten stats into rows
  const rows = useMemo(() => {
    const out = [];
    for (const ch of stats.children) {
      for (const [qcm_id, qcm_stats] of ch.children) {
        const qcm = qcmIndex[qcm_id];
        if (!qcm) continue;
        out.push({
          chapter: ch,
          qcm,
          stats: qcm_stats,
          summary: summarize(qcm_stats),
        });
      }
    }
    return out;
  }, [stats, qcmIndex]);

  const filtered = onlyBad ? rows.filter((r) => isBad(r.summary)) : rows;

  const totals = useMemo(() => {
    let attempts = 0, correct = 0;
    for (const r of rows) {
      attempts += r.summary.attempts;
      correct += r.summary.correct;
    }
    return { attempts, correct, rate: attempts ? correct / attempts : null };
  }, [rows]);

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
              checked={onlyBad}
              onChange={(e) => setOnlyBad(e.target.checked)}
            />
            Only low scores (&lt; 50%, ≥ 2 clicks)
          </label>
          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              if (confirm('Clear all stats? This cannot be undone.')) onReset();
            }}
          >
            Clear stats
          </button>
        </div>

        <div className="stats-list">
          {filtered.length === 0 ? (
            <div className="empty-msg">
              {onlyBad ? 'No QCMs with bad scores yet.' : 'No stats yet — answer a few questions to populate this list.'}
            </div>
          ) : (
            filtered.map((r) => (
              <div key={r.qcm.id} className={'stats-row' + (isBad(r.summary) ? ' bad' : '')}>
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
          )}
        </div>
      </div>
    </div>
  );
}
