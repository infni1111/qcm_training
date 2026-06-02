import { useEffect, useRef } from 'react';
import { APP_DATA } from './data.js';
import { SpeechPlayer, LANG_GUIDE } from './speech.js';

// The first screen of the app: choose between the two representations of the
// same training content.
//   'text'  -> the original visual flashcards (TextApp)
//   'voice' -> the audio version for blind / low-vision learners (VoiceApp)
//
// Accessibility: on mount we *speak* the menu (in French) so a learner who
// cannot see the screen immediately knows the two choices and their shortcuts.
// Keys 1 / 2 pick a mode without needing to find the buttons.
export default function ModeChooser({ onPick }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const player = new SpeechPlayer();
    playerRef.current = player;

    player.speak(
      'Entraînement CCNA. Choisissez un mode. ' +
        'Appuyez sur 1 pour le mode texte. ' +
        'Appuyez sur 2 pour le mode vocal, conçu pour les personnes aveugles.',
      { lang: LANG_GUIDE, rate: 1 },
    );

    const onKeyDown = (e) => {
      if (e.key === '1') {
        e.preventDefault();
        pick('text');
      } else if (e.key === '2') {
        e.preventDefault();
        pick('voice');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      player.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = (mode) => {
    // Stop the menu narration before handing off to the chosen mode.
    if (playerRef.current) playerRef.current.cancel();
    onPick(mode);
  };

  return (
    <main className="chooser" aria-label="Choose a mode">
      <h1 className="chooser-title">{APP_DATA.title}</h1>
      <p className="chooser-subtitle">Choisissez un mode · Choose a mode</p>

      <div className="chooser-options">
        <button
          type="button"
          className="mode-card mode-text"
          onClick={() => pick('text')}
        >
          <span className="mode-icon" aria-hidden="true">📖</span>
          <span className="mode-name">Mode texte</span>
          <span className="mode-desc">Flashcards visuelles classiques (touche 1)</span>
        </button>

        <button
          type="button"
          className="mode-card mode-voice"
          onClick={() => pick('voice')}
        >
          <span className="mode-icon" aria-hidden="true">🔊</span>
          <span className="mode-name">Mode vocal</span>
          <span className="mode-desc">
            Tout est lu à voix haute, pour les personnes aveugles (touche 2)
          </span>
        </button>
      </div>
    </main>
  );
}
