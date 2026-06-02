import { describe, it, expect, vi, afterEach } from 'vitest';
import { SpeechPlayer, LANG_CONTENT, LANG_GUIDE } from '../speech.js';

// jsdom has no speechSynthesis, so by default the player is unsupported and
// every method must be a safe no-op. We also test the supported path by
// installing a fake speechSynthesis on window.

afterEach(() => {
  delete window.speechSynthesis;
  delete window.SpeechSynthesisUtterance;
  vi.restoreAllMocks();
});

describe('SpeechPlayer (unsupported environment)', () => {
  it('reports not supported and never throws', () => {
    const p = new SpeechPlayer();
    expect(p.supported).toBe(false);
    expect(p.speaking).toBe(false);
    expect(p.paused).toBe(false);
    // None of these should throw without a synth.
    expect(() => p.pause()).not.toThrow();
    expect(() => p.resume()).not.toThrow();
    expect(() => p.cancel()).not.toThrow();
  });

  it('still invokes onEnd synchronously so callers can chain', () => {
    const p = new SpeechPlayer();
    const onEnd = vi.fn();
    p.speak('hello', { onEnd });
    expect(onEnd).toHaveBeenCalledTimes(1);
  });
});

describe('SpeechPlayer (supported environment)', () => {
  function installFakeSynth() {
    const utterances = [];
    window.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
      }
    };
    window.speechSynthesis = {
      speaking: false,
      paused: false,
      speak: vi.fn((u) => {
        utterances.push(u);
        window.speechSynthesis.speaking = true;
      }),
      pause: vi.fn(() => {
        window.speechSynthesis.paused = true;
      }),
      resume: vi.fn(() => {
        window.speechSynthesis.paused = false;
      }),
      cancel: vi.fn(() => {
        window.speechSynthesis.speaking = false;
        window.speechSynthesis.paused = false;
      }),
    };
    return utterances;
  }

  it('speaks with the requested lang/rate', () => {
    const utterances = installFakeSynth();
    const p = new SpeechPlayer();
    expect(p.supported).toBe(true);
    p.speak('Root Bridge', { lang: LANG_CONTENT, rate: 0.9 });
    expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(utterances[0].lang).toBe(LANG_CONTENT);
    expect(utterances[0].rate).toBe(0.9);
  });

  it('fires onEnd only for the latest utterance (stale ones are dropped)', () => {
    const utterances = installFakeSynth();
    const p = new SpeechPlayer();
    const first = vi.fn();
    const second = vi.fn();
    p.speak('first', { onEnd: first });
    p.speak('second', { onEnd: second }); // supersedes the first
    // Late onend from the stale first utterance must be ignored.
    utterances[0].onend();
    utterances[1].onend();
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('pause/resume delegate to the synth only when appropriate', () => {
    installFakeSynth();
    const p = new SpeechPlayer();
    p.speak('x'); // sets speaking = true
    p.pause();
    expect(window.speechSynthesis.pause).toHaveBeenCalled();
    p.resume();
    expect(window.speechSynthesis.resume).toHaveBeenCalled();
  });

  it('exposes distinct content and guide languages', () => {
    expect(LANG_CONTENT).not.toBe(LANG_GUIDE);
  });
});
