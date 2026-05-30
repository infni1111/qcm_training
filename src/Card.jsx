import { useState } from 'react';
import Concept from './Concept.jsx';
import Explanation from './Explanation.jsx';

// A single flashcard.
//  view === 0 -> Concept (front): the term only.
//  view === 1 -> Explanation (back): definition + self-rating buttons.
//
// Because <Card key={card.id}> in App.jsx, navigating to another card unmounts
// this one: `view` and `rating` are destroyed => a fresh card starts on its
// front, unrated. Revisiting the card later mounts a new instance and lets the
// user rate it again — that new event is appended to the cumulative history.
export default function Card({ card, index, total, animClass = '', interactive = true, onRate }) {
  const [view, setView] = useState(0);
  const [rating, setRating] = useState(null); // null | 1 (known) | 0 (unknown)

  const reveal = () => setView(1);
  const hide = () => setView(0);

  // Only the first rating of this visit is recorded (one event per card visit).
  const rate = (value) => {
    if (rating !== null) return;
    setRating(value);
    if (onRate) onRate(card.id, value);
  };

  return (
    <section
      className={'card ' + animClass}
      style={!interactive ? { pointerEvents: 'none' } : undefined}
      aria-hidden={!interactive}
    >
      <div className="card-index">Concept {index + 1} / {total}</div>

      {view === 0 ? (
        <Concept card={card} onReveal={reveal} />
      ) : (
        <Explanation card={card} rating={rating} onBack={hide} onRate={rate} />
      )}

      <div className="hint">
        {index > 0 && '↑ précédent'}
        {index > 0 && index < total - 1 && '   ·   '}
        {index < total - 1 && '↓ suivant'}
        {index === total - 1 && index > 0 && '  · fin'}
      </div>
    </section>
  );
}
