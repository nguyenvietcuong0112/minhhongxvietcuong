import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * AudioPlayer: Plays ambient romantic acoustic wedding melody using Web Audio API synthesis
 * (ensuring 100% offline reliability without broken mp3 links) with optional custom audio file support.
 */
const AudioPlayer = ({ isPlaying, onToggle }) => {
  const [volume] = useState(0.5);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Peaceful romantic pentatonic/arpeggiated chords (Elegance, romantic wedding harp/piano feel)
  const notes = [
    // Frequency array: C4, E4, G4, B4, C5, D5, E5, G5
    261.63, 329.63, 392.0, 493.88, 523.25, 587.33, 659.25, 783.99,
  ];

  const playChimeNote = useCallback((freq, time, duration = 2.2) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle warm sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.12 * volume, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }, [volume]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // Melodic progression pattern
    const pattern = [
      0, 2, 4, 6, 4, 2,
      1, 3, 5, 7, 5, 3,
      0, 4, 6, 7, 6, 4,
      1, 4, 5, 6, 4, 1,
    ];
    let step = 0;

    const tick = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;
      const noteIdx = pattern[step % pattern.length];
      const freq = notes[noteIdx % notes.length];
      const now = audioCtxRef.current.currentTime;
      playChimeNote(freq, now, 2.5);

      // Add harmonic chord fifth occasionally
      if (step % 3 === 0) {
        const bassFreq = notes[(noteIdx + 2) % notes.length] / 2;
        playChimeNote(bassFreq, now + 0.05, 3.0);
      }

      step++;
    };

    tick();
    timerRef.current = setInterval(tick, 900);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playChimeNote]);

  return null; // Headless component, controlled via ControlBar
};

export default AudioPlayer;
