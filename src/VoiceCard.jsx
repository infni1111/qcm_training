import { useCallback, useEffect, useRef, useState } from 'react';
import { SpeechPlayer, LANG_CONTENT, LANG_GUIDE } from './speech.js';

// One flashcard, spoken. Same *message* as the text <Card> (concept,
// explanation, self-rating, navigation) — only the *type* is voice.
//
// Like <Card key={card.id}> in text mode, this component is keyed by card.id in
// VoiceApp, so leaving a card unmounts it: playback stops, `revealed`/`rating`
// reset, and the next card starts fresh on its concept. That keep the "leave =
// reset to default" invariant the user asked for, now for audio too.
//
// The learning loop for this first version is deliberately just play & pause:
//   1. concept is spoken automatically on arrival,
//   2. press Play/Pause to replay or pause the audio,
//   3. press Reveal to hear the explanation,
//   4. self-rate (recorded into the shared stats history),
//   5. swipe / arrow to the next card.
export default function VoiceCard({ card, index, total, onRate, goNext, goPrev }) {
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState(null); // null | 1 (known) | 0 (unknown)
  const [status, setStatus] = useState('idle'); // 'idle' | 'speaking' | 'paused'

  const playerRef = useRef(null);
  if (playerRef.current === null) playerRef.current = new SpeechPlayer();
  const player = playerRef.current;
  const supported = player.supported;

  // Speak a short French position cue, then the English content of the current
  // phase. `phaseText` is the concept (front) or the explanation (back).
  const speakPhase = useCallback((phaseText, cue) => {
    setStatus('speaking');
    player.speak(cue, {
      lang: LANG_GUIDE,
      rate: 1,
      onEnd: () => {
        player.speak(phaseText, {
          lang: LANG_CONTENT,
          onEnd: () => setStatus('idle'),
        });
      },
    });
  }, [player]);

  const speakConcept = useCallback(() => {
    speakPhase(card.concept, `Concept ${index + 1} sur ${total}.`);
  }, [speakPhase, card.concept, index, total]);

  const speakExplanation = useCallback(() => {
    speakPhase(card.explanation, 'Explication.');
  }, [speakPhase, card.explanation]);

  // Arrive on a card -> announce and speak its concept automatically.
  useEffect(() => {
    speakConcept();
    return () => player.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Big Play/Pause button: context-aware.
  const togglePlay = useCallback(() => {
    if (status === 'speaking') {
      player.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      player.resume();
      setStatus('speaking');
    } else {
      // idle/finished -> replay the current phase from the start.
      revealed ? speakExplanation() : speakConcept();
    }
  }, [status, player, revealed, speakExplanation, speakConcept]);

  const reveal = useCallback(() => {
    if (revealed) {
      speakExplanation(); // already revealed -> just repeat it
      return;
    }
    setRevealed(true);
    speakExplanation();
  }, [revealed, speakExplanation]);

  const rate = useCallback((value) => {
    if (rating !== null) return; // one event per visit (mirrors text mode)
    setRating(value);
    if (onRate) onRate(card.id, value);
    player.speak(value === 1 ? 'Connu.' : 'À revoir.', { lang: LANG_GUIDE, rate: 1 });
    setStatus('speaking');
  }, [rating, onRate, card.id, player]);

  // Keyboard control — the primary interface for a blind learner. The listener
  // is per-card (this component remounts on navigation), so it always acts on
  // the current card's player and state.
  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.key) {
        case ' ':
        case 'p':
        case 'P':
          e.preventDefault();
          togglePlay();
          break;
        case 'r':
        case 'R':
        case 'Enter':
          e.preventDefault();
          reveal();
          break;
        case 'k':
        case 'K':
          e.preventDefault();
          rate(1);
          break;
        case 'j':
        case 'J':
          e.preventDefault();
          rate(0);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goPrev();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [togglePlay, reveal, rate, goNext, goPrev]);

  const playLabel =
    status === 'speaking' ? '⏸ Pause' : status === 'paused' ? '▶ Reprendre' : '▶ Écouter';

  return (
    <section className="voice-card" aria-label={`Concept ${index + 1} of ${total}`}>
      <div className="voice-index">Concept {index + 1} / {total}</div>

      {/* The text is still on screen (for sighted helpers / low vision) but the
          experience is driven by audio + the big controls below. */}
      <div className="voice-stage" aria-live="polite">
        <div className="voice-concept">{card.concept}</div>
        {revealed && <div className="voice-explanation">{card.explanation}</div>}
      </div>

      {!supported && (
        <div className="voice-unsupported" role="alert">
          La synthèse vocale n'est pas disponible dans ce navigateur. Le texte
          reste lisible ci-dessus.
        </div>
      )}

      <div className="voice-controls">
        <button
          type="button"
          className="voice-btn voice-play"
          onClick={togglePlay}
          aria-label={status === 'speaking' ? 'Pause' : 'Play'}
        >
          {playLabel}
        </button>

        <button
          type="button"
          className="voice-btn voice-reveal"
          onClick={reveal}
          aria-label={revealed ? 'Repeat the explanation' : 'Reveal the explanation'}
        >
          {revealed ? '🔁 Réécouter l’explication' : '🔓 Révéler l’explication'}
        </button>
      </div>

      <div className="voice-rate" role="group" aria-label="Self assessment">
        <button
          type="button"
          className={'voice-btn rate-know' + (rating === 1 ? ' chosen' : '')}
          disabled={rating !== null}
          onClick={() => rate(1)}
        >
          ✓ Je connais
        </button>
        <button
          type="button"
          className={'voice-btn rate-unknown' + (rating === 0 ? ' chosen' : '')}
          disabled={rating !== null}
          onClick={() => rate(0)}
        >
          ✗ Je ne connais pas
        </button>
      </div>

      <div className="voice-nav">
        <button
          type="button"
          className="voice-btn nav-prev"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Previous concept"
        >
          ↑ Précédent
        </button>
        <button
          type="button"
          className="voice-btn nav-next"
          onClick={goNext}
          disabled={index === total - 1}
          aria-label="Next concept"
        >
          Suivant ↓
        </button>
      </div>

      <p className="voice-help">
        Espace : écouter / pause · R : révéler · K : connu · J : à revoir ·
        flèches : naviguer
      </p>
    </section>
  );
}
