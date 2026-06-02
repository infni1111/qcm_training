import { useCallback, useEffect, useRef, useState } from 'react';
import { APP_DATA, CHAPTERS } from './data.js';
import Card from './Card.jsx';
import Stats from './Stats.jsx';

const SWIPE_THRESHOLD_PX = 50;
const SWIPE_MAX_DURATION_MS = 600;
const WHEEL_COOLDOWN_MS = 400;
const TRANSITION_MS = 260;

// appView toggles between the two branches under root: 'chapters' or 'stats'.
const VIEW_CHAPTERS = 0;
const VIEW_STATS = 1;

// The original text experience (flashcards + stats), now a leaf of the app
// router. Stats live in App.jsx so the two modes share one history; this
// component receives them as props. `onExit` returns to the mode chooser.
export default function TextApp({ stats, onRate, onResetStats, onExit }) {
  const [appView, setAppView] = useState(VIEW_CHAPTERS);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [qcmIndex, setQcmIndex] = useState(0);
  const [transition, setTransition] = useState(null);

  const chapter = CHAPTERS[chapterIndex];
  const total = chapter.children.length;
  const currentQcm = chapter.children[qcmIndex];

  const feedRef = useRef(null);
  const animatingRef = useRef(false);
  const touchStartRef = useRef(null);
  const lastWheelRef = useRef(0);

  // Body class drives header height: stats view has no chapters strip so the
  // header is shorter.
  useEffect(() => {
    document.body.classList.toggle('view-stats', appView === VIEW_STATS);
    return () => document.body.classList.remove('view-stats');
  }, [appView]);

  const goTo = useCallback((target, direction) => {
    if (animatingRef.current) return;
    if (target < 0 || target >= total) return;
    if (target === qcmIndex) return;
    animatingRef.current = true;
    const outgoing = chapter.children[qcmIndex];
    setTransition({ from: outgoing, direction });
    setQcmIndex(target);
    setTimeout(() => {
      setTransition(null);
      animatingRef.current = false;
    }, TRANSITION_MS + 30);
  }, [qcmIndex, total, chapter]);

  const goNext = useCallback(() => goTo(qcmIndex + 1, +1), [qcmIndex, goTo]);
  const goPrev = useCallback(() => goTo(qcmIndex - 1, -1), [qcmIndex, goTo]);

  // Gestures are only bound when the feed is visible.
  useEffect(() => {
    if (appView !== VIEW_CHAPTERS) return;
    const feed = feedRef.current;
    if (!feed) return;

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchStartRef.current = { y: e.touches[0].clientY, t: Date.now() };
    };
    const onTouchEnd = (e) => {
      const s = touchStartRef.current;
      if (!s) return;
      const y1 = e.changedTouches[0]?.clientY ?? s.y;
      const dy = s.y - y1;
      const dt = Date.now() - s.t;
      touchStartRef.current = null;
      if (dt > SWIPE_MAX_DURATION_MS) return;
      if (Math.abs(dy) < SWIPE_THRESHOLD_PX) return;
      dy > 0 ? goNext() : goPrev();
    };
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < WHEEL_COOLDOWN_MS) return;
      if (Math.abs(e.deltaY) < 8) return;
      lastWheelRef.current = now;
      e.deltaY > 0 ? goNext() : goPrev();
    };
    const onKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goNext();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goPrev();
      }
    };

    feed.addEventListener('touchstart', onTouchStart, { passive: true });
    feed.addEventListener('touchend', onTouchEnd, { passive: true });
    feed.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      feed.removeEventListener('touchstart', onTouchStart);
      feed.removeEventListener('touchend', onTouchEnd);
      feed.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goNext, goPrev, appView]);

  const handleChapter = (i) => {
    if (i === chapterIndex) return;
    setChapterIndex(i);
    setQcmIndex(0);
    setTransition(null);
  };

  return (
    <>
      <header className="app-header">
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
          <h1>{APP_DATA.title}</h1>
          <div className="view-switch" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={appView === VIEW_CHAPTERS}
              className={'tab' + (appView === VIEW_CHAPTERS ? ' active' : '')}
              onClick={() => setAppView(VIEW_CHAPTERS)}
            >
              Concepts
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={appView === VIEW_STATS}
              className={'tab' + (appView === VIEW_STATS ? ' active' : '')}
              onClick={() => setAppView(VIEW_STATS)}
            >
              Stats
            </button>
          </div>
        </div>
        {appView === VIEW_CHAPTERS && CHAPTERS.length > 1 && (
          <div className="strip" aria-label="Chapters">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                className={'pill' + (i === chapterIndex ? ' active' : '')}
                onClick={() => handleChapter(i)}
              >
                {ch.title}
              </button>
            ))}
          </div>
        )}
      </header>

      {appView === VIEW_CHAPTERS ? (
        <main className="feed" ref={feedRef} aria-label="Concepts">
          {total <= 15 && (
            <div className="dots" aria-hidden="true">
              {chapter.children.map((_, i) => (
                <span key={i} className={'dot' + (i === qcmIndex ? ' active' : '')} />
              ))}
            </div>
          )}

          {transition && (
            <Card
              key={`out-${transition.from.id}`}
              card={transition.from}
              index={chapter.children.indexOf(transition.from)}
              total={total}
              animClass={transition.direction > 0 ? 'exit-to-top' : 'exit-to-bottom'}
              interactive={false}
              onRate={onRate}
            />
          )}

          <Card
            key={currentQcm.id}
            card={currentQcm}
            index={qcmIndex}
            total={total}
            animClass={
              transition
                ? (transition.direction > 0 ? 'enter-from-bottom' : 'enter-from-top')
                : ''
            }
            interactive={true}
            onRate={onRate}
          />
        </main>
      ) : (
        <Stats stats={stats} onReset={onResetStats} />
      )}
    </>
  );
}
