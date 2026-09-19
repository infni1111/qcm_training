# CCNA Training

A mobile-first **flashcard** training app for CCNA exam preparation. One concept
per screen, TikTok-style discrete swipe to move to the next one. Each card shows
a concept term on the front; you recall the definition from memory, tap to
*reveal* the explanation on the back, then self-rate "Je connais" / "Je ne
connais pas". Knowledge rate is tracked per device.

The app opens on a **mode chooser**: *text mode* (the visual flashcards) or
*voice mode*, an audio version for blind / low-vision learners where cards and
guidance are read aloud with the browser's Web Speech API. Both modes share the
same cards and the same stats history.

**Status:** flashcard frontend complete (migrated from the earlier
multiple-choice QCM model), with text and voice modes. `data.js` holds 383
cards in 15 chapters: 81 "Cisco Concepts" cards generated from a PostgreSQL
`db_course.cisco` table, plus 14 module-summary chapters (302 cards). A minimal Flask static server serves the
build. The REST API and live database integration are not implemented yet.

---

## 1. Architecture at a glance

### 1.1. The tree

Everything in the app is modelled as a tree with two branches under the root.
`data.js` owns the static training branch; `stats.js` owns the mutable
per-device stats branch.

```
root (L0) — title "CCNA Training"
├── chapters (L1)                         APP_DATA.children[0]
│   └── chapter (L2)                      "cisco" (Cisco Concepts) + mod1 … mod14
│       └── card (L3)                     cisco: c1 … c82 (81 cards; ids are not gapless)
│                                          modN: chNc1 … (302 cards) — 383 total
│                                          each { concept, explanation } — NO children
│
└── stats (L1)                            loadStats() → built from localStorage
    └── chapter (L2)                      same ids as under 'chapters'
        └── [card_id, card_stats] (L3)    a 2-tuple list:
                                           card_stats = [[ts_ms, value], …]
                                           value ∈ {0: "I don't know", 1: "I know"}
```

> Every node carries its level number as a hint; the code never branches on it —
> it walks `.children` instead. The numbering is documentation, not behaviour.

### 1.2. Why two branches

The **training branch** is static content. The **stats branch** is per-user
state that evolves with use. Keeping them as sibling branches under the same
root lets the UI treat them symmetrically — see the app-level
`chapters` ↔ `stats` view switch in `TextApp.jsx`.

### 1.3. Stack

| Layer     | Tool                                                     |
|-----------|----------------------------------------------------------|
| UI        | React 18 + Vite 5, `vite-plugin-pwa`                     |
| Voice     | Web Speech API (`speechSynthesis`) via `src/speech.js`   |
| Tests     | Vitest + jsdom                                           |
| Server    | Flask (`server.py`) — serves `dist/` on port 8080 (SPA)  |
| Storage   | `localStorage` under key `ccna_stats_v1` (schema v2)     |

---

## 2. Component map

```
App                                  src/App.jsx — mode router, owns shared stats
├── ModeChooser                      src/ModeChooser.jsx (mode === null; keys 1 / 2)
├── VoiceApp → VoiceCard             src/VoiceApp.jsx, src/VoiceCard.jsx (mode === 'voice')
└── TextApp                          src/TextApp.jsx (mode === 'text')

TextApp                              src/TextApp.jsx
├── <header>
│   ├── <h1>CCNA Training</h1>
│   ├── .view-switch                  ← appView useState: 0=Concepts | 1=Stats
│   └── .strip (chapters pills)       ← only when appView === 0 && >1 chapter
│
├── <main className="feed">           ← appView === 0
│   ├── .dots                         (position indicator, only if ≤15 cards)
│   └── Card (keyed by card.id)       src/Card.jsx
│       ├── view useState             ← 0: Concept (front) | 1: Explanation (back)
│       ├── rating useState           ← null | 1 (known) | 0 (unknown)
│       ├── Concept                   src/Concept.jsx     (view === 0)
│       └── Explanation               src/Explanation.jsx (view === 1)
│
└── <main className="stats-view">     ← appView === 1
    └── Stats                         src/Stats.jsx
        ├── KPIs (Notes totales / Connus / Taux de connaissance)
        ├── filter checkbox "Concepts à revoir"
        └── list:
            - default: one row per chapter (aggregate rate)
            - filtered: one row per card with wrong > 0 (rated "unknown")
```

### 2.1. Two view switches — the same pattern at two scales

| Scope     | State owner   | Values                  | UI            |
|-----------|---------------|-------------------------|---------------|
| App       | `TextApp.jsx` | 0 concepts / 1 stats    | Header tabs   |
| Card      | `Card.jsx`    | 0 concept / 1 explanation | "Révéler" button / explanation title |

Both switches render **one** of two sibling components at a time. This is
deliberate: *there is no intermediate state where both are half-visible*.

---

## 3. Key invariants to know before editing

### 3.1. `<Card key={card.id}>` → state resets when leaving a card

In `TextApp.jsx`, the `<Card>` element is keyed by `currentQcm.id` (the current
card's id). Navigating to a new card changes that key, so React **unmounts** the
old `<Card>` and mounts a fresh one. Both `view` (Concept/Explanation) and
`rating` (null/1/0) live inside `Card`, so they automatically reset for the new
card — it starts on its front, unrated: leaving a card returns it to its default
state. (`VoiceApp` does the same with a keyed `<VoiceCard>`.)

Do not hoist `view` or `rating` into `TextApp.jsx` — you would break that reset.

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

### 3.3. One stats event per card visit

In `Card.jsx`, `rate(value)` bails out if `rating` is already set. Only the
first rating of a visit triggers `onRate(card_id, value)`, which appends
`[Date.now(), 1|0]` to that card's `card_stats`. Re-clicking the rate buttons
does nothing (they are disabled once rated). Navigating away and back is a *new*
visit (new `<Card>` instance) and records a *new* event. **Stats are historical**
— only `clearStats()` (the "Clear" button in the Stats view) can wipe them.

### 3.4. Stats schema migrations

`mergeWithCurrent(saved)` in `stats.js` is deliberately shape-agnostic: it
walks *any* saved tree and collects every `[card_id, events]` leaf pair, then
rebuilds a fresh tree under the current schema and re-injects known histories.
If you change `APP_DATA` (add/remove chapters or cards), users don't lose their
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

# …or on a different port (8080 is taken by GNS3 on this machine):
PORT=8090 python3 server.py
```

Open <http://127.0.0.1:8080/> (or `:8090`). In GitHub Codespaces, forward the port.

`server.py` reads the `PORT` env var (default `8080`). On this dev machine **port
8080 is occupied by a GNS3 server**, so the app is run on **8090** instead — see
`serve.sh` and §4.2.

Vite dev server (HMR) is also available on port 5173 via `npm run dev`, but
it's independent of the Flask server. The canonical way to test is the Flask
build since that's what the planned REST API will integrate with.

### 4.1. Offline / PWA

The app is an **installable, offline-capable PWA** (`vite-plugin-pwa`, configured
in `vite.config.js`). `npm run build` generates a Workbox service worker
(`dist/sw.js`) plus `dist/manifest.webmanifest`, and precaches the whole app
shell (HTML + hashed JS/CSS + icons). This is what makes the app keep working
when `server.py` / the network is down: **the server is only needed for the very
first load**; after that the service worker serves the cached shell, and all
content (`data.js`, bundled) and progress (`localStorage`, see `stats.js`) are
already local — there is no API round-trip.

`registerType: 'autoUpdate'` means a fresh `npm run build` + reload silently
updates the cached worker. To test offline: load once over HTTP, then kill the
server (or toggle airplane mode on the phone) and reload — it still runs. Icons
live in `public/`.

### 4.2. Run it on your phone (WSL → Windows LAN) — `serve.sh`

This project runs in **WSL2 on Windows**. WSL2's NAT hides its ports from the
LAN, so a Windows-side `netsh portproxy` is needed to reach the app from a phone.
The WSL IP changes on every WSL restart, which is why a one-shot launcher exists:

```bash
./serve.sh              # build if needed, start app on :8090, set up the proxy
./serve.sh --build      # force a fresh `npm run build` first
./serve.sh --no-proxy   # local/WSL only, skip the proxy + UAC prompt
PORT=9090 ./serve.sh    # different port end-to-end
```

`serve.sh` (1) reads the current WSL IP, (2) builds if `dist/` is missing,
(3) starts Flask on `PORT` (default **8090**) detached, (4) **verifies the
response is actually the CCNA app** — guarding against the GNS3-on-8080 mix-up,
where GNS3's catch-all returns `200` for any path and looks like a healthy
server — then (5) regenerates `C:\Users\Public\wslproxy<PORT>.ps1` with the fresh
IP baked in and runs it **elevated** (approve the **UAC prompt**), mapping
`0.0.0.0:<PORT> → <wsl-ip>:<PORT>` and adding firewall rule "WSL app <PORT>".

Phone URL (same Wi-Fi): **`http://<windows-lan-ip>:8090/`** — set `LAN_IP` in
`serve.sh` to your Windows machine's LAN IP. Stop the server with `fuser -k 8090/tcp`.

> The IP is baked in from the WSL side on purpose: running `wsl hostname -I`
> *inside* the elevated Windows PowerShell returns a mangled string (UTF-16 /
> locale), which silently produced a broken `connectaddress`. Generating the
> script from WSL avoids that. A cleaner long-term fix is `networkingMode=mirrored`
> in `%UserProfile%\.wslconfig`. For a public URL, prefer Cloudflare Pages
> (this network can't reach onrender.com).

---

## 5. Directory layout

```
qcm_training/
├── index.html            Vite entry
├── package.json          react, react-dom, vite, vite-plugin-pwa, vitest, jsdom
├── vite.config.js        build + PWA config + vitest config (jsdom env)
├── server.py             Flask static file server (SPA fallback; PORT env, default 8080)
├── serve.sh              one-shot launcher: build + run on :8090 + Windows LAN proxy
├── render.yaml           Render blueprint (static-site deploy of dist/)
├── README.md             this file
├── public/               PWA icons (copied verbatim into dist by Vite)
├── src/
│   ├── main.jsx          React entry
│   ├── App.jsx           mode router (menu / text / voice) + shared stats
│   ├── ModeChooser.jsx   first screen: pick text or voice mode (spoken menu)
│   ├── TextApp.jsx       text mode: header, view switch, chapters strip, gestures
│   ├── VoiceApp.jsx      voice mode: chapter select + keyed VoiceCard
│   ├── VoiceCard.jsx     one spoken card: play/pause, reveal, self-rating
│   ├── speech.js         SpeechPlayer wrapper around window.speechSynthesis
│   ├── Card.jsx          single flashcard; owns view + rating
│   ├── Concept.jsx       card front: concept term + "Révéler" (view === 0)
│   ├── Explanation.jsx   card back: explanation + self-rating (view === 1)
│   ├── Stats.jsx         inline stats view (appView === 1)
│   ├── data.js           APP_DATA tree + CHAPTERS alias (generated from Postgres)
│   ├── stats.js          buildEmptyStats, load/save/merge/record/summarize/…
│   ├── index.css         all styles (dark theme, mobile-first)
│   └── __tests__/
│       ├── data.test.js  tree invariants
│       ├── speech.test.js SpeechPlayer behaviour (with and without speechSynthesis)
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

- **`<body class="view-stats">`** is toggled from `TextApp.jsx` via a `useEffect`.
  It's the one piece of imperative DOM the app keeps. It exists because the
  header height changes when the chapters strip is hidden and CSS variables
  scoped to a body class were the simplest way.

- **Flask is a thin static server right now.** `server.py` serves `./dist`
  with a fallback to `index.html` for unknown paths (SPA-friendly). Later,
  it is meant to gain `/api/*` endpoints for the stats.

- **Stats are device-local.** Clearing your browser's site data wipes them.
  A real DB is planned (see §7). Do not rely on localStorage surviving
  beyond the current step.

- **The TikTok-style transitions are a visual effect, not a scroll.**
  `touchmove` is deliberately ignored: the card does *not* follow the finger.
  If you re-introduce finger-following you break the "step function" design.

- **`data.js` has two sources.** The "Cisco Concepts" chapter is generated from
  a PostgreSQL `db_course.cisco` table (81 rows); card ids run `c1 … c82` with a
  gap, so don't assume ids are contiguous. The 14 module chapters (`mod1` …
  `mod14`, 302 cards) summarise the "What did I learn in this module?" sections
  of the CCNA course modules.

- **Card content is in English, UI labels are mixed.** Concept terms and
  explanations are in English (the CCNA exam is in English), and voice mode
  reads them with an `en-US` voice. UI strings and spoken guidance are mostly
  French (rating buttons, stats KPIs, `fr-FR` voice prompts), with some English
  (Clear / Stats); that's the current state, not a bug.

---

## 7. What's next

- **Flask REST API:** move read/write of cards and stats behind
  `/api/*`. The frontend would fetch cards on boot and POST each rating event.
  Keep the tree shape as the wire format (it's already JSON-safe).

- **Live database integration:** the Cisco Concepts chapter is already
  *generated* from PostgreSQL `db_course.cisco`, but the running app does not
  talk to the DB. The next step would serve cards from the DB and persist ratings append-only:
  `stats(card_id, user_id, ts_ms, value)`.

- Nice-to-haves not yet built:
  - Spaced-repetition / "review only unknown" study mode.
  - Per-user auth (today: one device = one user).
  - Progression chart (line graph of daily knowledge rate).
