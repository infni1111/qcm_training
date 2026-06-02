import { useCallback, useState } from 'react';
import { CHAPTERS } from './data.js';
import VoiceCard from './VoiceCard.jsx';

// Voice mode shell: same navigation model as TextApp (chapters -> cards) but
// rendered as audio. No swipe animation here — a blind learner navigates by
// button or arrow key, so each move is an instant, announced swap of the keyed
// <VoiceCard>. Stats are the shared history owned by App.jsx.
export default function VoiceApp({ onRate, onExit }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [qcmIndex, setQcmIndex] = useState(0);

  const chapter = CHAPTERS[chapterIndex];
  const total = chapter.children.length;
  const currentCard = chapter.children[qcmIndex];

  const goNext = useCallback(() => {
    setQcmIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setQcmIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleChapter = (e) => {
    setChapterIndex(Number(e.target.value));
    setQcmIndex(0);
  };

  return (
    <>
      <header className="app-header voice-header">
        <div className="header-row">
          <button
            type="button"
            className="menu-btn"
            onClick={onExit}
            aria-label="Back to the mode menu"
            title="Menu"
          >
            ‹ Menu
          </button>
          <h1>Mode vocal</h1>
          {CHAPTERS.length > 1 ? (
            <label className="chapter-select">
              <span className="sr-only">Chapter</span>
              <select value={chapterIndex} onChange={handleChapter} aria-label="Choose a chapter">
                {CHAPTERS.map((ch, i) => (
                  <option key={ch.id} value={i}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <span />
          )}
        </div>
      </header>

      <main className="voice-feed" aria-label="Voice concepts">
        <VoiceCard
          key={currentCard.id}
          card={currentCard}
          index={qcmIndex}
          total={total}
          onRate={onRate}
          goNext={goNext}
          goPrev={goPrev}
        />
      </main>
    </>
  );
}
