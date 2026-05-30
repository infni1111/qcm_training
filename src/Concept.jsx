// Flashcard front (Card view === 0): shows only the concept term.
// The user recalls the definition from memory, then taps "Reveal" to flip the
// card to its back (Explanation), where they self-rate.
export default function Concept({ card, onReveal }) {
  return (
    <div className="concept-block">
      <div className="concept-term">{card.concept}</div>
      <button
        type="button"
        className="reveal-btn"
        onClick={onReveal}
        aria-label="Reveal the explanation"
      >
        Révéler l'explication ▾
      </button>
    </div>
  );
}
