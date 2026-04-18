import { useCallback, useEffect, useRef, useState } from 'react';
import { APP_DATA } from './data.js';
import Card from './Card.jsx';

const SWIPE_THRESHOLD_PX = 50;
const SWIPE_MAX_DURATION_MS = 600;
const WHEEL_COOLDOWN_MS = 400;
const TRANSITION_MS = 260;

export default function App() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [qcmIndex, setQcmIndex] = useState(0);
  // When navigating, we keep the outgoing qcm for the slide animation.
  // { from: qcm, direction: +1 | -1 } | null
  const [transition, setTransition] = useState(null);

  const chapter = APP_DATA.children[chapterIndex];
  const total = chapter.children.length;
  const currentQcm = chapter.children[qcmIndex];

  const feedRef = useRef(null);
  const animatingRef = useRef(false);
  const touchStartRef = useRef(null);
  const lastWheelRef = useRef(0);

  const goTo = useCallback((target, direction) => {
    if (animatingRef.current) return;
    if (target < 0 || target >= total) return;
    if (target === qcmIndex) return;
    animatingRef.current = true;
    const outgoing = chapter.children[qcmIndex];
    setTransition({ from: outgoing, direction });
    setQcmIndex(target);
    // clear transition after animation
    setTimeout(() => {
      setTransition(null);
      animatingRef.current = false;
    }, TRANSITION_MS + 30);
  }, [qcmIndex, total, chapter]);

  const goNext = useCallback(() => goTo(qcmIndex + 1, +1), [qcmIndex, goTo]);
  const goPrev = useCallback(() => goTo(qcmIndex - 1, -1), [qcmIndex, goTo]);

  useEffect(() => {
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
  }, [goNext, goPrev]);

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
          <h1>{APP_DATA.title}</h1>
          <span className="counter">Q {qcmIndex + 1} / {total}</span>
        </div>
        <div className="strip" aria-label="Chapters">
          {APP_DATA.children.map((ch, i) => (
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
      </header>

      <main className="feed" ref={feedRef} aria-label="Questions">
        <div className="dots" aria-hidden="true">
          {chapter.children.map((_, i) => (
            <span key={i} className={'dot' + (i === qcmIndex ? ' active' : '')} />
          ))}
        </div>

        {/* Outgoing card (only during a transition) */}
        {transition && (
          <Card
            key={`out-${transition.from.id}`}
            qcm={transition.from}
            index={chapter.children.indexOf(transition.from)}
            total={total}
            animClass={transition.direction > 0 ? 'exit-to-top' : 'exit-to-bottom'}
            interactive={false}
          />
        )}

        {/* Current card — key on qcm.id => remount on change => view state resets to 0 */}
        <Card
          key={currentQcm.id}
          qcm={currentQcm}
          index={qcmIndex}
          total={total}
          animClass={
            transition
              ? (transition.direction > 0 ? 'enter-from-bottom' : 'enter-from-top')
              : ''
          }
          interactive={true}
        />
      </main>
    </>
  );
}
