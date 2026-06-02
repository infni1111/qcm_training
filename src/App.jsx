import { useCallback, useState } from 'react';
import ModeChooser from './ModeChooser.jsx';
import TextApp from './TextApp.jsx';
import VoiceApp from './VoiceApp.jsx';
import { clearStats, loadStats, recordAnswer, saveStats } from './stats.js';

// Top-level router. The app now starts on a mode chooser with two options that
// represent the SAME training content in two different *types*:
//   'text'  -> TextApp  (visual flashcards, the original experience)
//   'voice' -> VoiceApp (everything is spoken, for blind / low-vision learners)
//
// The invariant across both modes is the message: the cards in data.js and the
// per-device stats history. Stats live here so they are shared — a concept you
// rated in voice mode counts the same as one rated in text mode.
const MODE_MENU = null;

export default function App() {
  const [mode, setMode] = useState(MODE_MENU); // null | 'text' | 'voice'
  const [stats, setStats] = useState(loadStats);

  // value: 1 = "I know this concept", 0 = "I don't". Appended to the cumulative
  // history so the knowledge rate can be tracked over time.
  const onRate = useCallback((card_id, value) => {
    setStats((prev) => {
      const next = recordAnswer(prev, card_id, value);
      saveStats(next);
      return next;
    });
  }, []);

  const onResetStats = useCallback(() => {
    setStats(clearStats());
  }, []);

  const backToMenu = useCallback(() => setMode(MODE_MENU), []);

  if (mode === 'voice') {
    return <VoiceApp onRate={onRate} onExit={backToMenu} />;
  }
  if (mode === 'text') {
    return (
      <TextApp
        stats={stats}
        onRate={onRate}
        onResetStats={onResetStats}
        onExit={backToMenu}
      />
    );
  }
  return <ModeChooser onPick={setMode} />;
}
