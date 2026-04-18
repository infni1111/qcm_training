// Feed discret type TikTok : une SEULE card visible à la fois.
// Un geste (swipe / wheel / flèches) déclenche une transition "escalier" vers la card voisine.
// Pas de scroll continu, pas d'état intermédiaire manipulable par le doigt.

const state = {
  chapterId: null,
  qcmIndex: 0,              // index dans chapter.children
  picks: {},                // qcmId -> Set(answerId)
  animating: false
};

const SWIPE_THRESHOLD_PX = 50;     // distance min pour valider un swipe
const SWIPE_MAX_DURATION_MS = 600; // au-delà on ignore (pas un flick)
const WHEEL_COOLDOWN_MS = 400;     // anti-répétition wheel

const $ = (id) => document.getElementById(id);

function currentChapter() {
  return APP_DATA.children.find(c => c.id === state.chapterId) || null;
}
function currentQcm() {
  const ch = currentChapter();
  return ch ? ch.children[state.qcmIndex] : null;
}
function picksFor(qcmId) {
  if (!state.picks[qcmId]) state.picks[qcmId] = new Set();
  return state.picks[qcmId];
}

/* ------------------------- CARDS ------------------------- */

function buildCard(qcm, index, total) {
  const card = document.createElement("section");
  card.className = "card";
  card.dataset.qcmId = qcm.id;

  const idx = document.createElement("div");
  idx.className = "card-index";
  idx.textContent = `Question ${index + 1} / ${total}`;
  card.appendChild(idx);

  const title = document.createElement("h2");
  title.className = "question-title";
  title.textContent = qcm.title;
  card.appendChild(title);

  const answers = document.createElement("div");
  answers.className = "answers";
  const picked = picksFor(qcm.id);

  qcm.children.forEach(a => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer";
    btn.dataset.id = a.id;

    const label = document.createElement("span");
    label.textContent = a.text;
    btn.appendChild(label);

    if (picked.has(a.id)) {
      btn.classList.add(a.correct ? "correct" : "wrong");
      const mark = document.createElement("span");
      mark.className = "mark";
      mark.textContent = a.correct ? "✓" : "✗";
      btn.appendChild(mark);
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (picked.has(a.id)) return;
      picked.add(a.id);
      // redraw uniquement la card active (pas de transition)
      redrawCurrentCard();
    });
    answers.appendChild(btn);
  });
  card.appendChild(answers);

  // toolbar
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "reset-btn";
  reset.textContent = "Réinitialiser";
  reset.addEventListener("click", (e) => {
    e.stopPropagation();
    state.picks[qcm.id] = new Set();
    redrawCurrentCard();
  });
  toolbar.appendChild(reset);

  const totalCorrect = qcm.children.filter(x => x.correct).length;
  const foundCorrect = qcm.children.filter(x => x.correct && picked.has(x.id)).length;
  const wrong = [...picked].filter(id => {
    const a = qcm.children.find(x => x.id === id);
    return a && !a.correct;
  }).length;

  const score = document.createElement("span");
  score.className = "score";
  score.textContent = `Bonnes : ${foundCorrect}/${totalCorrect}` + (wrong ? ` · erreurs : ${wrong}` : "");
  if (foundCorrect === totalCorrect && wrong === 0) {
    score.classList.add("done");
    score.textContent += "  ✓";
  }
  toolbar.appendChild(score);
  card.appendChild(toolbar);

  // indice bas/haut
  const hint = document.createElement("div");
  hint.className = "hint";
  const parts = [];
  if (index > 0)          parts.push("↑ précédente");
  if (index < total - 1)  parts.push("↓ suivante");
  hint.textContent = parts.join("   ·   ") || "Fin du chapitre";
  card.appendChild(hint);

  return card;
}

function redrawCurrentCard() {
  const feed = $("feed");
  const existing = feed.querySelector(".card");
  if (!existing) return;
  const chapter = currentChapter();
  const qcm = chapter.children[state.qcmIndex];
  const fresh = buildCard(qcm, state.qcmIndex, chapter.children.length);
  existing.replaceWith(fresh);
  renderDots();
}

/* ------------------------- TRANSITIONS ------------------------- */

function goTo(targetIndex, direction /* +1 next, -1 prev */) {
  if (state.animating) return;
  const chapter = currentChapter();
  if (!chapter) return;
  const total = chapter.children.length;
  if (targetIndex < 0 || targetIndex >= total) return;
  if (targetIndex === state.qcmIndex) return;

  state.animating = true;
  const feed = $("feed");
  const current = feed.querySelector(".card");
  const qcm = chapter.children[targetIndex];
  const next = buildCard(qcm, targetIndex, total);

  // position initiale du next (hors-écran)
  next.classList.add(direction > 0 ? "enter-from-bottom" : "enter-from-top");
  feed.appendChild(next);

  // force un reflow pour que la classe initiale soit prise en compte
  // avant qu'on retire la classe d'entrée
  void next.offsetWidth;

  // déclenche la transition
  next.classList.remove("enter-from-bottom", "enter-from-top");
  if (current) current.classList.add(direction > 0 ? "exit-to-top" : "exit-to-bottom");

  const cleanup = () => {
    if (current && current.parentNode) current.parentNode.removeChild(current);
    state.qcmIndex = targetIndex;
    state.animating = false;
    updateCounter();
    renderDots();
  };
  // utilise la fin de transition sur "next"
  next.addEventListener("transitionend", cleanup, { once: true });
  // filet de sécurité si transitionend ne tire pas
  setTimeout(cleanup, 500);
}

function goNext() {
  const chapter = currentChapter();
  if (!chapter) return;
  if (state.qcmIndex < chapter.children.length - 1) goTo(state.qcmIndex + 1, +1);
}
function goPrev() {
  if (state.qcmIndex > 0) goTo(state.qcmIndex - 1, -1);
}

/* ------------------------- RENDU GLOBAL ------------------------- */

function renderChapters() {
  const root = $("chapters");
  root.innerHTML = "";
  APP_DATA.children.forEach(ch => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (ch.id === state.chapterId ? " active" : "");
    btn.textContent = ch.title;
    btn.addEventListener("click", () => {
      if (ch.id === state.chapterId) return;
      state.chapterId = ch.id;
      state.qcmIndex = 0;
      renderChapters();
      renderFeedFromScratch();
    });
    root.appendChild(btn);
  });
}

function renderFeedFromScratch() {
  const feed = $("feed");
  feed.innerHTML = "";
  // rebuild dots placeholder
  const dots = document.createElement("div");
  dots.className = "dots";
  dots.id = "dots";
  feed.appendChild(dots);

  const chapter = currentChapter();
  if (!chapter || chapter.children.length === 0) {
    feed.innerHTML += '<div class="empty">Aucune question dans ce chapitre.</div>';
    updateCounter();
    return;
  }
  const qcm = chapter.children[state.qcmIndex] || chapter.children[0];
  const card = buildCard(qcm, state.qcmIndex, chapter.children.length);
  feed.appendChild(card);
  updateCounter();
  renderDots();
}

function renderDots() {
  const dots = $("dots");
  if (!dots) return;
  dots.innerHTML = "";
  const chapter = currentChapter();
  if (!chapter) return;
  chapter.children.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "dot" + (i === state.qcmIndex ? " active" : "");
    dots.appendChild(d);
  });
}

function updateCounter() {
  const chapter = currentChapter();
  const el = $("counter");
  if (!chapter) { el.textContent = "–"; return; }
  el.textContent = `Q ${state.qcmIndex + 1} / ${chapter.children.length}`;
}

/* ------------------------- GESTES ------------------------- */

function bindGestures() {
  const feed = $("feed");

  // Touch swipe (discret : pas de suivi du doigt, juste décision au relâcher)
  let tStart = null;
  feed.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    tStart = { y: e.touches[0].clientY, t: Date.now() };
  }, { passive: true });

  feed.addEventListener("touchend", (e) => {
    if (!tStart) return;
    const t1 = Date.now();
    const y1 = (e.changedTouches[0] || {}).clientY ?? tStart.y;
    const dy = tStart.y - y1;                // >0 = doigt a glissé vers le haut
    const dt = t1 - tStart.t;
    tStart = null;
    if (dt > SWIPE_MAX_DURATION_MS) return;
    if (Math.abs(dy) < SWIPE_THRESHOLD_PX) return;
    if (dy > 0) goNext(); else goPrev();
  }, { passive: true });

  // Wheel (desktop / trackpad)
  let lastWheel = 0;
  feed.addEventListener("wheel", (e) => {
    // on bloque le scroll natif pour éviter toute dérive
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheel < WHEEL_COOLDOWN_MS) return;
    if (Math.abs(e.deltaY) < 8) return;
    lastWheel = now;
    if (e.deltaY > 0) goNext(); else goPrev();
  }, { passive: false });

  // Clavier
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goNext(); }
    else if (["ArrowUp", "PageUp"].includes(e.key))      { e.preventDefault(); goPrev(); }
  });
}

/* ------------------------- INIT ------------------------- */

function init() {
  $("app-title").textContent = APP_DATA.title;
  document.title = APP_DATA.title;

  const first = APP_DATA.children[0];
  if (first) {
    state.chapterId = first.id;
    state.qcmIndex = 0;
  }

  renderChapters();
  renderFeedFromScratch();
  bindGestures();
}

document.addEventListener("DOMContentLoaded", init);
