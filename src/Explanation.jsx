// Flashcard back (Card view === 1): shows the explanation, then the two
// self-rating buttons. Tapping the header flips back to the concept (front).
//
// `rating` is the value already recorded for THIS visit (null | 1 | 0). The
// parent Card owns it so it survives the front<->back flip but resets when the
// card unmounts (navigation), per the <Card key={card.id}> invariant.
export default function Explanation({ card, rating, onBack, onRate }) {
  const rated = rating !== null;
  return (
    <div className="explanation-block">
      <button
        type="button"
        className="explanation-title"
        onClick={onBack}
        aria-label="Back to the concept"
      >
        <span className="chevron open" aria-hidden="true">▾</span>
        <span>{card.concept} — appuie pour masquer</span>
      </button>

      <div className="explanation-body">{card.explanation}</div>

      <div className="rate-bar">
        <button
          type="button"
          className={'rate-btn know' + (rating === 1 ? ' chosen' : '')}
          disabled={rated}
          onClick={() => onRate(1)}
        >
          ✓ Je connais
        </button>
        <button
          type="button"
          className={'rate-btn unknown' + (rating === 0 ? ' chosen' : '')}
          disabled={rated}
          onClick={() => onRate(0)}
        >
          ✗ Je ne connais pas
        </button>
      </div>

      {rated && (
        <div className="rate-done">
          {rating === 1 ? 'Noté : connu ✓' : 'Noté : à revoir ✗'} · glisse pour le suivant
        </div>
      )}
    </div>
  );
}
