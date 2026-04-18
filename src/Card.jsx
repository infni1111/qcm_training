import { useState } from 'react';
import Qcm from './Qcm.jsx';
import Explanation from './Explanation.jsx';

// View states:
//  0 -> show the QCM (question + answers)
//  1 -> show the explanation
// Because <Card key={qcm.id}> in App.jsx, navigating to another QCM
// unmounts this Card: view (and picks) are destroyed => reset to 0 on remount.
export default function Card({ qcm, index, total, animClass = '', interactive = true }) {
  const [view, setView] = useState(0);
  const [picks, setPicks] = useState(() => new Set());

  const showExplanation = () => setView(1);
  const showQcm = () => setView(0);

  return (
    <section
      className={'card ' + animClass}
      // disable input on the outgoing (animating-out) copy
      style={!interactive ? { pointerEvents: 'none' } : undefined}
      aria-hidden={!interactive}
    >
      <div className="card-index">Question {index + 1} / {total}</div>

      {view === 0 ? (
        <Qcm qcm={qcm} picks={picks} setPicks={setPicks} onOpenExplanation={showExplanation} />
      ) : (
        <Explanation qcm={qcm} onBack={showQcm} />
      )}

      <div className="hint">
        {index > 0 && '↑ previous'}
        {index > 0 && index < total - 1 && '   ·   '}
        {index < total - 1 && '↓ next'}
        {index === total - 1 && index > 0 && '  · end of chapter'}
      </div>
    </section>
  );
}
