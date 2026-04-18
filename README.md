# CCNA Training

A mobile-first QCM (multiple-choice-question) training app for CCNA exam
preparation. One question per screen, TikTok-style discrete swipe to move to
the next one, a concept explanation behind every question, and per-chapter
progression statistics stored locally.

**Status:** step 1 complete (frontend + minimal Flask static server). Steps 2
(REST API) and 3 (persistent database) are not implemented yet.

---

## 1. Architecture at a glance

### 1.1. The tree

Everything in the app is modelled as a tree with two branches under the root.
`data.js` owns the static training branch; `stats.js` owns the mutable
per-device stats branch.

```
root (L0) — title "CCNA Training"
├── chapters (L1)                         APP_DATA.children[0]
│   └── chapter (L2)                      ch1 … ch6
│       └── qcm (L3)                      ch1_q1 … ch6_q5
│           └── answer (L4)               each { text, correct: boolean }
│
└── stats (L1)                            loadStats() → built from localStorage
    └── chapter (L2)                      same ids as under 'chapters'
        └── [qcm_id, qcm_stats] (L3)      a 2-tuple list:
                                           qcm_stats = [[ts_ms, value], …]
                                           value ∈ {0: wrong click, 1: correct click}
```

> Every node carries its level number as a hint; the code never branches on it —
> it walks `.children` instead. The numbering is documentation, not behaviour.

### 1.2. Why two branches

The **training branch** is static content. The **stats branch** is per-user
state that evolves with use. Keeping them as sibling branches under the same
root lets the UI treat them symmetrically — see the app-level
`chapters` ↔ `stats` view switch in `App.jsx`.

### 1.3. Stack

| Layer     | Tool                                                     |
|-----------|----------------------------------------------------------|
| UI        | React 18 + Vite 5                                        |
| Tests     | Vitest + jsdom                                           |
| Server    | Flask (`server.py`) — serves `dist/` on port 8080 (SPA)  |
| Storage   | `localStorage` under key `ccna_stats_v1` (schema v2)     |

---

## 2. Component map

```
App                                  src/App.jsx
├── <header>
│   ├── <h1>CCNA Training</h1>
│   ├── .view-switch                  ← appView useState: 0=Chapters | 1=Stats
│   └── .strip (chapters pills)       ← only when appView === 0
│
├── <main className="feed">           ← appView === 0
│   ├── .dots                         (position indicator inside chapter)
│   └── Card (keyed by qcm.id)        src/Card.jsx
│       ├── view useState             ← 0: QCM | 1: Explanation
│       ├── picks useState            ← Set of answer ids already clicked
│       ├── Qcm                       src/Qcm.jsx   (view === 0)
│       └── Explanation               src/Explanation.jsx (view === 1)
│
└── <main className="stats-view">     ← appView === 1
    └── Stats                         src/Stats.jsx
        ├── KPIs (total / correct / rate)
        ├── filter checkbox "Show questions answered wrong"
        └── list:
            - default: one row per chapter (aggregate rate)
            - filtered: one row per QCM with wrong > 0
```

### 2.1. Two view switches — the same pattern at two scales

| Scope     | State owner   | Values              | UI            |
|-----------|---------------|---------------------|---------------|
| App       | `App.jsx`     | 0 chapters / 1 stats| Header tabs   |
| Card      | `Card.jsx`    | 0 qcm / 1 explanation | Clickable question / explanation title |

Both switches render **one** of two sibling components at a time. This is
deliberate: *there is no intermediate state where both are half-visible*.

---

## 3. Key invariants to know before editing

### 3.1. `<Card key={qcm.id}>` → state resets when leaving a card

In `App.jsx`, the `<Card>` element is keyed by `currentQcm.id`. Navigating to a
new QCM changes that key, so React **unmounts** the old `<Card>` and mounts a
fresh one. Both `view` (QCM/Explanation) and `picks` (clicked answers) live
inside `Card`, so they automatically reset to `0` / empty for the new question.
This is exactly what the user asked for with: "when I leave, the state returns
to its default."

Do not hoist `view` or `picks` into `App.jsx` — you would break that reset.

### 3.2. Discrete step-function navigation

Swipe/wheel/key events on the `.feed` element do *not* follow the finger
during the gesture. Logic:

1. `touchstart` records `{ y, t }`.
2. `touchmove` is ignored.
3. `touchend` computes `dy` and `dt`. If `|dy| ≥ 50px` AND `dt ≤ 600ms`,
   `goNext()` / `goPrev()` fires.
4. `goTo()` keeps both cards mounted for `TRANSITION_MS` (260 ms) — outgoing
   gets `.exit-to-top` / `.exit-to-bottom`, incoming gets `.enter-from-bottom`
   / `.enter-from-top`. After the timeout, the outgoing card is dropped.

Wheel events use a `WHEEL_COOLDOWN_MS = 400` so one trackpad tick = one step.

### 3.3. One stats event per first click on each answer

In `Qcm.jsx`, `pick(id)` bails out if the answer is already in `picks`. Only
the first click triggers `onAnswer(qcm_id, correct)`, which appends
`[Date.now(), 1|0]` to `qcm_stats`. Re-clicking the same answer does nothing.
**Clicking Reset does not clear stats** — stats are historical and only
`clearStats()` (from the Stats view) can wipe them.

### 3.4. Stats schema migrations

`mergeWithCurrent(saved)` in `stats.js` is deliberately shape-agnostic: it
walks *any* saved tree and collects every `[qcm_id, events]` leaf pair, then
rebuilds a fresh tree under the current schema and re-injects known histories.
If you change `APP_DATA` (add/remove chapters or QCMs), users don't lose their
history — missing ids start with `[]`, unknown ids are silently dropped.

Bump `SCHEMA_VERSION` when the *semantics* of an event change (e.g. if you
ever store something other than `[ts, 0|1]` at leaves).

---

## 4. Build, run, test

```bash
# install JS deps
npm install

# build the React bundle into ./dist
npm run build

# run the tests (pure functions + data invariants)
npm test

# start the Flask server (serves ./dist on 0.0.0.0:8080)
python3 server.py
```

Open <http://127.0.0.1:8080/>. In GitHub Codespaces, forward port 8080.

Vite dev server (HMR) is also available on port 5173 via `npm run dev`, but
it's independent of the Flask server. The canonical way to test is the Flask
build since that's what steps 2/3 will integrate with.

---

## 5. Directory layout

```
qcm_training/
├── index.html            Vite entry
├── package.json          react, react-dom, vite, vitest, jsdom
├── vite.config.js        build config + vitest config (jsdom env)
├── server.py             Flask static file server with SPA fallback
├── README.md             this file
├── src/
│   ├── main.jsx          React entry
│   ├── App.jsx           top-level state, header, view switch, gestures
│   ├── Card.jsx          single-question card; owns view + picks
│   ├── Qcm.jsx           question + answers (view === 0)
│   ├── Explanation.jsx   concept explanation (view === 1)
│   ├── Stats.jsx         inline stats view (appView === 1)
│   ├── data.js           APP_DATA tree + CHAPTERS alias
│   ├── stats.js          buildEmptyStats, load/save/merge/record/summarize/…
│   ├── index.css         all styles (dark theme, mobile-first)
│   └── __tests__/
│       ├── data.test.js  tree invariants
│       └── stats.test.js pure-function + persistence + migration
├── dist/                 Vite build output (gitignored)
└── node_modules/         gitignored
```

---

## 6. Gotchas / non-obvious decisions

- **The `level` field on every node is for documentation only.** The code
  always walks `.children`. Renumbering levels (step 1.8) did not require any
  runtime changes.

- **`CHAPTERS` is a live alias**, not a copy: `CHAPTERS === APP_DATA.children[0].children`.
  Prefer importing `CHAPTERS` when you want to iterate chapters — it removes
  the `.children[0]` clutter and makes the intent explicit.

- **`<body class="view-stats">`** is toggled from `App.jsx` via a `useEffect`.
  It's the one piece of imperative DOM the app keeps. It exists because the
  header height changes when the chapters strip is hidden and CSS variables
  scoped to a body class were the simplest way.

- **Flask is a thin static server right now.** `server.py` serves `./dist`
  with a fallback to `index.html` for unknown paths (SPA-friendly). In step 2,
  it will gain `/api/*` endpoints for the stats.

- **Stats are device-local.** Clearing your browser's site data wipes them.
  Step 3 will introduce a real DB. Do not rely on localStorage surviving
  beyond the current step.

- **The TikTok-style transitions are a visual effect, not a scroll.**
  `touchmove` is deliberately ignored: the card does *not* follow the finger.
  If you re-introduce finger-following you break the "step function" the user
  insisted on.

- **QCM questions are in French, UI labels in English.** This was a deliberate
  mid-step decision (see the session feedback). Do not auto-translate QCM
  content — it's CCNA material authored in French on purpose.

---

## 7. What's next

- **Step 2 — Flask REST API:** move read/write of chapters and stats behind
  `/api/*`. The frontend would fetch chapters on boot and POST each answer
  event. Keep the tree shape as the wire format (it's already JSON-safe).

- **Step 3 — Persistent database:** the obvious fit is SQLite (zero-ops) with
  three tables: `chapters`, `qcms` (with `explanation`), `answers`
  (with `correct`). The stats table would be append-only:
  `stats(qcm_id, user_id, ts_ms, value)`.

- Nice-to-haves that were declined for step 1:
  - Per-attempt completion score (float `0..1`) alongside raw click events.
  - Per-user auth (today: one device = one user).
  - Progression chart (line graph of daily rate).

---

## 8. Notes for future Claude instances

- **Start by reading `README.md` + `src/data.js` + `src/stats.js`**, in that
  order. The README is opinionated about invariants; the source files are the
  source of truth.
- **Do not rewrite `data.js` in bulk** — it's long. Use targeted `Edit`
  replacements or scripted `sed`/`python` transforms.
- **Re-run `npm test` after any change to `stats.js` or `data.js`.** The tests
  lock in the tree shape and the merge semantics.
- **The user is French** and appreciates a corrected English transcription of
  their prompt at the start of each reply (stored in auto-memory as
  `feedback_english_correction`). They also prefer English-only for code and
  code comments now (set during step 1.5).
- **`python3 server.py` is already running** in the background during an
  active session. Probe it with `curl` before starting a new one.
- **Never commit `dist/` or `node_modules/`** — both are in `.gitignore`.
  The canonical deploy is `npm install && npm run build && python3 server.py`.
