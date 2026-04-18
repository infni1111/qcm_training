// Explanation view: shown when the parent Card's `view` state is 1.
// Clicking the header flips view back to 0 (QCM).
export default function Explanation({ qcm, onBack }) {
  return (
    <div className="explanation-block">
      <button
        type="button"
        className="explanation-title"
        onClick={onBack}
        aria-label="Back to question"
      >
        <span className="chevron open" aria-hidden="true">▾</span>
        <span>Concept — tap to go back</span>
      </button>
      <div className="explanation-body">{qcm.explanation}</div>
    </div>
  );
}
