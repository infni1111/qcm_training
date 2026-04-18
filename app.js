// Rendu style TikTok : une "card" plein écran par QCM dans un conteneur scroll-snap.
// Le chapitre actif change le feed ; scroll vertical pour passer d'un QCM au suivant.

const state = {
  chapterId: null,
  qcmId: null,        // mis à jour par l'IntersectionObserver
  picks: {}           // qcmId -> Set(answerId)
};

const $ = (id) => document.getElementById(id);

function currentChapter() {
  return APP_DATA.children.find(c => c.id === state.chapterId) || null;
}
function picksFor(qcmId) {
  if (!state.picks[qcmId]) state.picks[qcmId] = new Set();
  return state.picks[qcmId];
}

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
      state.qcmId = ch.children[0] ? ch.children[0].id : null;
      renderChapters();
      renderFeed();
    });
    root.appendChild(btn);
  });
}

function renderFeed() {
  const feed = $("feed");
  feed.innerHTML = "";
  const chapter = currentChapter();
  if (!chapter || chapter.children.length === 0) {
    feed.innerHTML = '<div class="empty">Aucune question dans ce chapitre.</div>';
    updateCounter();
    return;
  }

  chapter.children.forEach((qcm, i) => {
    feed.appendChild(renderCard(qcm, i, chapter.children.length));
  });

  feed.scrollTop = 0;
  observeCards();
  updateCounter();
}

function renderCard(qcm, index, total) {
  const card = document.createElement("section");
  card.className = "card";
  card.dataset.qcmId = qcm.id;
  card.dataset.index = String(index);

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

    btn.addEventListener("click", () => {
      if (picked.has(a.id)) return;
      picked.add(a.id);
      const fresh = renderCard(qcm, index, total);
      card.replaceWith(fresh);
      observeCards();
    });
    answers.appendChild(btn);
  });
  card.appendChild(answers);

  // toolbar bas de card
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "reset-btn";
  reset.textContent = "Réinitialiser";
  reset.addEventListener("click", () => {
    state.picks[qcm.id] = new Set();
    const fresh = renderCard(qcm, index, total);
    card.replaceWith(fresh);
    observeCards();
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

  // indicateur swipe pour QCM suivant
  if (index < total - 1) {
    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = "↓ swipe pour la question suivante";
    card.appendChild(hint);
  }

  return card;
}

// --- IntersectionObserver : met à jour state.qcmId quand une card est dominante ---
let io = null;
function observeCards() {
  if (io) io.disconnect();
  const feed = $("feed");
  io = new IntersectionObserver(
    (entries) => {
      // sélectionner l'entrée avec le plus grand ratio visible
      let best = null;
      entries.forEach(e => {
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      });
      if (best && best.isIntersecting && best.intersectionRatio >= 0.5) {
        const qcmId = best.target.dataset.qcmId;
        if (qcmId !== state.qcmId) {
          state.qcmId = qcmId;
          updateCounter();
        }
      }
    },
    { root: feed, threshold: [0.5, 0.75, 1] }
  );
  feed.querySelectorAll(".card").forEach(c => io.observe(c));
}

function updateCounter() {
  const chapter = currentChapter();
  const el = $("counter");
  if (!chapter || !state.qcmId) { el.textContent = "–"; return; }
  const idx = chapter.children.findIndex(q => q.id === state.qcmId);
  el.textContent = idx >= 0 ? `Q ${idx + 1} / ${chapter.children.length}` : "–";
}

function init() {
  $("app-title").textContent = APP_DATA.title;
  document.title = APP_DATA.title;

  const first = APP_DATA.children[0];
  if (first) {
    state.chapterId = first.id;
    if (first.children[0]) state.qcmId = first.children[0].id;
  }

  renderChapters();
  renderFeed();
}

document.addEventListener("DOMContentLoaded", init);
