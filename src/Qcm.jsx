// QCM view: question + answers. Clicking the question title flips view -> 1
// (handled by parent Card). Clicking an answer records a pick (stopPropagation
// keeps that click from also opening the explanation).
export default function Qcm({ qcm, picks, setPicks, onOpenExplanation, onAnswer }) {
  const pick = (id) => {
    if (picks.has(id)) return;
    const answer = qcm.children.find((a) => a.id === id);
    const next = new Set(picks);
    next.add(id);
    setPicks(next);
    if (answer && onAnswer) onAnswer(qcm.id, answer.correct);
  };

  const totalCorrect = qcm.children.filter((a) => a.correct).length;
  const foundCorrect = qcm.children.filter((a) => a.correct && picks.has(a.id)).length;
  const wrong = [...picks].filter((id) => {
    const a = qcm.children.find((x) => x.id === id);
    return a && !a.correct;
  }).length;
  const done = foundCorrect === totalCorrect && wrong === 0;

  return (
    <div className="qcm-block">
      <button
        type="button"
        className="question-title"
        onClick={onOpenExplanation}
        aria-label="Show explanation"
      >
        <span className="chevron" aria-hidden="true">▸</span>
        <span className="question-text">{qcm.title}</span>
      </button>

      <div className="answers">
        {qcm.children.map((a) => {
          const isPicked = picks.has(a.id);
          const cls = 'answer' + (isPicked ? (a.correct ? ' correct' : ' wrong') : '');
          return (
            <button
              key={a.id}
              type="button"
              className={cls}
              onClick={(e) => {
                e.stopPropagation();
                pick(a.id);
              }}
            >
              <span>{a.text}</span>
              {isPicked && <span className="mark">{a.correct ? '✓' : '✗'}</span>}
            </button>
          );
        })}
      </div>

      <div className="toolbar">
        <button
          type="button"
          className="reset-btn"
          onClick={(e) => {
            e.stopPropagation();
            setPicks(new Set());
          }}
        >
          Reset
        </button>
        <span className={'score' + (done ? ' done' : '')}>
          Correct: {foundCorrect}/{totalCorrect}
          {wrong > 0 && ` · wrong: ${wrong}`}
          {done && '  ✓'}
        </span>
      </div>
    </div>
  );
}
