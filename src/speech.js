// speech.js — the "type transformation" at the heart of voice mode.
//
// Topology analogy (the user's framing): a flashcard is a *message*
// (concept + explanation + navigation). Text mode and voice mode are two
// representations of that same invariant message; only the *type* differs.
// This module is the map text -> voice: it turns a string into spoken audio
// using the browser's built-in SpeechSynthesis (Web Speech API). No network,
// no dependency, works offline — which matters for a learning tool.
//
// It degrades gracefully: in environments without speechSynthesis (jsdom under
// vitest, very old browsers) every method is a safe no-op and `supported` is
// false, so the UI can show a fallback instead of crashing.

// Card content is English (the CCNA exam is in English), spoken guidance is
// French (the user and the intended blind learners are French speakers).
export const LANG_CONTENT = 'en-US';
export const LANG_GUIDE = 'fr-FR';

function getSynth() {
  return typeof window !== 'undefined' && window.speechSynthesis
    ? window.speechSynthesis
    : null;
}

// A tiny stateful player. One per voice session is enough; it owns at most one
// active utterance at a time and exposes play/pause/resume/cancel.
export class SpeechPlayer {
  constructor() {
    this.synth = getSynth();
    // Bumped on every cancel() so a late onend from a stale utterance is
    // ignored (avoids firing onEnd for speech the user already skipped).
    this._token = 0;
  }

  get supported() {
    return !!this.synth;
  }

  get speaking() {
    return !!this.synth && this.synth.speaking;
  }

  get paused() {
    return !!this.synth && this.synth.paused;
  }

  // Speak one message. `onEnd` runs only when this exact utterance finishes
  // naturally (not when a newer speak()/cancel() supersedes it).
  speak(text, { lang = LANG_CONTENT, rate = 0.95, onEnd } = {}) {
    if (!this.synth || !text) {
      if (onEnd) onEnd();
      return;
    }
    this.cancel();
    const token = this._token;
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = lang;
    u.rate = rate;
    const finish = () => {
      if (token === this._token && onEnd) onEnd();
    };
    u.onend = finish;
    u.onerror = finish;
    this.synth.speak(u);
  }

  pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) this.synth.resume();
  }

  // Stop everything and invalidate any in-flight onEnd callbacks.
  cancel() {
    this._token += 1;
    if (this.synth) this.synth.cancel();
  }
}
