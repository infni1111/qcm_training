// Rendu de l'arbre APP_DATA (data.js) en UI mobile-first.
// État local : chapitre sélectionné, QCM sélectionné, réponses cliquées par QCM.

const state = {
  chapterId: null,
  qcmId: null,
  picks: {} // qcmId -> Set(answerId)
};

const $ = (id) => document.getElementById(id);

function findChapter(id) {
  return APP_DATA.children.find(c => c.id === id) || null;
}
function findQcm(chapter, id) {
  return chapter ? (chapter.children.find(q => q.id === id) || null) : null;
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
      state.chapterId = ch.id;
      state.qcmId = ch.children[0] ? ch.children[0].id : null;
      renderAll();
    });
    root.appendChild(btn);
  });
}

function renderQcms() {
  const root = $("qcms");
  root.innerHTML = "";
  const chapter = findChapter(state.chapterId);
  if (!chapter || chapter.children.length === 0) {
    root.innerHTML = '<span class="empty">Aucune question.</span>';
    return;
  }
  chapter.children.forEach((q, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pill" + (q.id === state.qcmId ? " active" : "");
    btn.textContent = "Q" + (i + 1);
    btn.title = q.title;
    btn.addEventListener("click", () => {
      state.qcmId = q.id;
      renderAll();
    });
    root.appendChild(btn);
  });
}

function renderAnswers() {
  const titleEl = $("question-title");
  const root = $("answers");
  const scoreEl = $("score");
  root.innerHTML = "";
  scoreEl.textContent = "";
  scoreEl.classList.remove("done");

  const chapter = findChapter(state.chapterId);
  const qcm = findQcm(chapter, state.qcmId);
  if (!qcm) {
    titleEl.textContent = "";
    root.innerHTML = '<span class="empty">Sélectionnez une question.</span>';
    return;
  }
  titleEl.textContent = qcm.title;

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
      renderAnswers();
    });
    root.appendChild(btn);
  });

  const totalCorrect = qcm.children.filter(x => x.correct).length;
  const foundCorrect = qcm.children.filter(x => x.correct && picked.has(x.id)).length;
  const wrong = [...picked].filter(id => {
    const a = qcm.children.find(x => x.id === id);
    return a && !a.correct;
  }).length;

  scoreEl.textContent = `Bonnes réponses : ${foundCorrect}/${totalCorrect}` +
                       (wrong ? ` — erreurs : ${wrong}` : "");
  if (foundCorrect === totalCorrect && wrong === 0) {
    scoreEl.classList.add("done");
    scoreEl.textContent += "  ✓ terminé";
  }
}

function renderAll() {
  renderChapters();
  renderQcms();
  renderAnswers();
}

function init() {
  $("app-title").textContent = APP_DATA.title;
  document.title = APP_DATA.title;

  const first = APP_DATA.children[0];
  if (first) {
    state.chapterId = first.id;
    if (first.children[0]) state.qcmId = first.children[0].id;
  }

  $("reset-btn").addEventListener("click", () => {
    if (state.qcmId) state.picks[state.qcmId] = new Set();
    renderAnswers();
  });

  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
