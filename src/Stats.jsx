import { useMemo, useState } from 'react';
import { CHAPTERS } from './data.js';
import { chapterAggregates, forEachQcmStats, summarize } from './stats.js';

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

function buildCardIndex() {
  const idx = {};
  for (const ch of CHAPTERS) {
    for (const c of ch.children) idx[c.id] = { chapter: ch, card: c };
  }
  return idx;
}

export default function Stats({ stats, onReset }) {
  // Default: per-chapter aggregates. Toggle => list of concepts marked unknown.
  const [showUnknown, setShowUnknown] = useState(false);
  const cardIndex = useMemo(buildCardIndex, []);

  const chapterRows = useMemo(() => chapterAggregates(stats), [stats]);

  const unknownRows = useMemo(() => {
    const out = [];
    forEachQcmStats(stats, ({ chapter, qcm_id, qcm_stats }) => {
      const summary = summarize(qcm_stats);
      if (summary.wrong > 0) {
        const meta = cardIndex[qcm_id];
        if (meta) out.push({ chapter, card: meta.card, summary });
      }
    });
    return out;
  }, [stats, cardIndex]);

  const totals = useMemo(() => {
    let attempts = 0, correct = 0;
    for (const row of chapterRows) {
      attempts += row.attempts;
      correct += row.correct;
    }
    return { attempts, correct, rate: attempts ? correct / attempts : null };
  }, [chapterRows]);

  return (
    <main className="stats-view" aria-label="Stats">
      <div className="stats-kpis">
        <div className="kpi">
          <div className="kpi-label">Notes totales</div>
          <div className="kpi-value">{totals.attempts}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Connus</div>
          <div className="kpi-value">{totals.correct}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Taux de connaissance</div>
          <div className="kpi-value">{pct(totals.rate)}</div>
        </div>
      </div>

      <div className="stats-controls">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={showUnknown}
            onChange={(e) => setShowUnknown(e.target.checked)}
          />
          Concepts à revoir
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
        {!showUnknown ? (
          chapterRows.every((r) => r.attempts === 0) ? (
            <div className="empty-msg">
              Aucune note pour l'instant — évalue quelques concepts pour remplir cette liste.
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
                    <span className="stats-row-last">à revoir : {r.wrong}</span>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          unknownRows.length === 0 ? (
            <div className="empty-msg">Aucun concept à revoir — bravo.</div>
          ) : (
            unknownRows.map((r) => (
              <div key={r.card.id} className="stats-row bad">
                <div className="stats-row-title">
                  <span className="stats-row-chapter">{r.chapter.id}</span>
                  <span className="stats-row-qcm">{r.card.concept}</span>
                </div>
                <div className="stats-row-metrics">
                  <span>{r.summary.correct}/{r.summary.attempts} ({pct(r.summary.rate)})</span>
                  <span className="stats-row-last">dernier : {fmtDate(r.summary.last)}</span>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </main>
  );
}
