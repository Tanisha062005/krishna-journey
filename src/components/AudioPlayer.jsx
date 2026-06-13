import React, { useEffect, useRef } from 'react';

// Helper to create noise buffer
const createNoiseBuffer = (ctx) => {
  const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

export default function AudioPlayer({ isPlaying, setIsPlaying, isEpilogue, activeIndex, chapters, showActGate, gateAct }) {
  const synthRef = useRef(null);

  // Initialize and run Web Audio API synthesizer
  useEffect(() => {
    if (!isPlaying) {
      // If paused/muted, clean up the synthesis engine to release audio hardware
      cleanupSynth();
      return;
    }

    // Initialize AudioContext on user interaction
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API not supported in this browser.");
      setIsPlaying(false);
      return;
    }

    const ctx = new AudioContextClass();
    const noiseBuffer = createNoiseBuffer(ctx);
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Setup spacial delay/feedback echo node for bansuri flutes
    const bansuriDelay = ctx.createDelay();
    bansuriDelay.delayTime.value = 0.45;
    const bansuriFeedback = ctx.createGain();
    bansuriFeedback.gain.value = 0.35;
    bansuriDelay.connect(bansuriFeedback);
    bansuriFeedback.connect(bansuriDelay); // feedback loop
    const delayOutput = ctx.createGain();
    delayOutput.gain.value = 0.4;
    bansuriDelay.connect(delayOutput);
    delayOutput.connect(masterGain);

    // Master gains for each soundscape zone
    const gains = {
      vrindavan: ctx.createGain(),
      mathura: ctx.createGain(),
      govardhan: ctx.createGain(),
      ashram: ctx.createGain(),
      dwarka: ctx.createGain(),
      epilogue: ctx.createGain(),
      transition: ctx.createGain()
    };

    // Connect all zone gains to master output
    Object.values(gains).forEach(g => {
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.connect(masterGain);
    });

    const timers = [];

    // --- ZONE 1: Vrindavan Synthesizer (Bansuri sequence & Birds) ---
    // Algorithmic bansuri sequencer playing a peaceful scale
    const bansuriScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5
    const playBansuriNote = (targetGainNode) => {
      if (ctx.state === 'suspended') return;
      const osc = ctx.createOscillator();
      osc.type = 'triangle'; // triangle is warm and woodwind-like
      
      // Select random note
      const freq = bansuriScale[Math.floor(Math.random() * bansuriScale.length)];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Sligt vibrato LFO (5.5Hz)
      const vibrato = ctx.createOscillator();
      vibrato.frequency.value = 5.5;
      const vibratoGain = ctx.createGain();
      vibratoGain.gain.value = freq * 0.008; // moderate vibrato range
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8); // slow swell
      noteGain.gain.setValueAtTime(0.12, ctx.currentTime + 2.5);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.9); // release

      osc.connect(noteGain);
      noteGain.connect(targetGainNode);
      noteGain.connect(bansuriDelay); // send to spacious echo node

      vibrato.start();
      osc.start();
      vibrato.stop(ctx.currentTime + 4.0);
      osc.stop(ctx.currentTime + 4.0);
    };

    // Vrindavan Bird Chirper sequence
    const triggerBirdChirps = () => {
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const timeOffset = i * 0.25;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500 + Math.random() * 500, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(3200 + Math.random() * 400, now + timeOffset + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1800, now + timeOffset + 0.15);

        const birdGain = ctx.createGain();
        birdGain.gain.setValueAtTime(0.001, now + timeOffset);
        birdGain.gain.linearRampToValueAtTime(0.015, now + timeOffset + 0.03);
        birdGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.15);

        osc.connect(birdGain);
        birdGain.connect(gains.vrindavan);
        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.16);
      }
    };

    // Start Vrindavan loops
    const bansuriInterval = setInterval(() => playBansuriNote(gains.vrindavan), 4200);
    const birdsInterval = setInterval(triggerBirdChirps, 9000);
    timers.push(bansuriInterval, birdsInterval);

    // --- ZONE 2: Mathura Synthesizer (Temple bells) ---
    const triggerTempleBells = () => {
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      const baseFreq = 220 + Math.random() * 60; // resonant bell chimes
      const partials = [1.0, 2.0, 3.0, 4.2];
      const partialGains = [0.08, 0.04, 0.02, 0.01];

      partials.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * ratio, now);

        const bellGain = ctx.createGain();
        bellGain.gain.setValueAtTime(0.001, now);
        bellGain.gain.linearRampToValueAtTime(partialGains[idx], now + 0.02); // quick hit
        bellGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5); // long decay ring

        osc.connect(bellGain);
        bellGain.connect(gains.mathura);
        osc.start(now);
        osc.stop(now + 4.6);
      });
    };
    const bellsInterval = setInterval(triggerTempleBells, 12000);
    timers.push(bellsInterval);

    // --- ZONE 3: Govardhan Synthesizer (Stormy Rain & Wind) ---
    // Rain Noise Generator
    const rainNoise = createNoiseNode(ctx, noiseBuffer);
    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1000;
    const rainVol = ctx.createGain();
    rainVol.gain.value = 0.025; // soft rain backdrop
    rainNoise.connect(rainFilter);
    rainFilter.connect(rainVol);
    rainVol.connect(gains.govardhan);
    rainNoise.start();

    // Wind Generator
    const windNoise = createNoiseNode(ctx, noiseBuffer);
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 350;
    
    // Wind Modulator LFO for howling effect
    const windLFO = ctx.createOscillator();
    windLFO.frequency.value = 0.08;
    const windLFOGain = ctx.createGain();
    windLFOGain.gain.value = 120; // modulate cutoff between 230Hz and 470Hz
    windLFO.connect(windLFOGain);
    windLFOGain.connect(windFilter.frequency);
    
    const windVol = ctx.createGain();
    windVol.gain.value = 0.035;
    windNoise.connect(windFilter);
    windFilter.connect(windVol);
    windVol.connect(gains.govardhan);
    windLFO.start();
    windNoise.start();

    // --- ZONE 4: Ashram Synthesizer (Wind Chimes) ---
    const triggerWindChimes = () => {
      if (ctx.state === 'suspended') return;
      const now = ctx.currentTime;
      const chimesCount = 3 + Math.floor(Math.random() * 3);
      const chimeFreqs = [1800, 2100, 2400, 2800, 3100];
      for (let i = 0; i < chimesCount; i++) {
        const timeOffset = i * (0.1 + Math.random() * 0.15);
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
        osc.frequency.setValueAtTime(freq, now + timeOffset);

        const chimeGain = ctx.createGain();
        chimeGain.gain.setValueAtTime(0.001, now + timeOffset);
        chimeGain.gain.linearRampToValueAtTime(0.02, now + timeOffset + 0.01);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.8); // quick chime ring

        osc.connect(chimeGain);
        chimeGain.connect(gains.ashram);
        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.9);
      }
    };
    const chimesInterval = setInterval(triggerWindChimes, 6500);
    timers.push(chimesInterval);

    // --- ZONE 5: Dwarka Synthesizer (Ocean Waves) ---
    const waveNoise = createNoiseNode(ctx, noiseBuffer);
    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = 'lowpass';
    
    // Wave LFO modulates volume and filter sweeps
    const waveLFO = ctx.createOscillator();
    waveLFO.frequency.value = 0.07; // 14s cycle
    const waveLfoFilterGain = ctx.createGain();
    waveLfoFilterGain.gain.value = 300; // swing cutoff 150Hz to 750Hz
    const waveLfoVolGain = ctx.createGain();
    waveLfoVolGain.gain.value = 0.055; // swing volume 0.005 to 0.115

    waveLFO.connect(waveLfoFilterGain);
    waveLfoFilterGain.connect(waveFilter.frequency);
    waveLFO.connect(waveLfoVolGain);

    const waveVol = ctx.createGain();
    waveVol.gain.value = 0.06; // base volume
    waveLfoVolGain.connect(waveVol.gain); // apply LFO modulation to gain

    waveNoise.connect(waveFilter);
    waveFilter.connect(waveVol);
    waveVol.connect(gains.dwarka);

    waveLFO.start();
    waveNoise.start();

    // --- ZONE 6: Epilogue / Final Scene Synthesizer (Soft breeze & bansuri) ---
    const finalWindNoise = createNoiseNode(ctx, noiseBuffer);
    const finalWindFilter = ctx.createBiquadFilter();
    finalWindFilter.type = 'lowpass';
    finalWindFilter.frequency.value = 220;
    const finalWindVol = ctx.createGain();
    finalWindVol.gain.value = 0.015; // extremely quiet wind breeze
    finalWindNoise.connect(finalWindFilter);
    finalWindFilter.connect(finalWindVol);
    finalWindVol.connect(gains.epilogue);
    finalWindNoise.start();

    const finalBansuriInterval = setInterval(() => playBansuriNote(gains.epilogue), 4800);
    timers.push(finalBansuriInterval);

    // Store references in Ref
    synthRef.current = {
      ctx,
      masterGain,
      gains,
      timers,
      activeZone: ''
    };

    // First context activation trigger on browser rules
    if (ctx.state === 'suspended') {
      const resumeContext = () => {
        ctx.resume();
        window.removeEventListener('click', resumeContext);
        window.removeEventListener('scroll', resumeContext);
      };
      window.addEventListener('click', resumeContext);
      window.addEventListener('scroll', resumeContext);
    }

    return () => {
      cleanupSynth();
    };
  }, [isPlaying]);

  // Handle crossfades when scrolling acts or triggering act gates
  useEffect(() => {
    if (!synthRef.current) return;
    const { ctx, gains } = synthRef.current;
    if (ctx.state === 'suspended') return;

    let targetZone = '';

    if (showActGate) {
      targetZone = 'transition';
    } else {
      // Determine active zone based on scroll index
      const activeChapter = chapters[activeIndex];
      if (activeIndex === 24) {
        targetZone = 'epilogue';
      } else if (activeIndex === 13) {
        // Govardhan Leela chapter (rain rain)
        targetZone = 'govardhan';
      } else if (activeChapter) {
        const act = activeChapter.act;
        if (act === 'I') targetZone = 'vrindavan';
        else if (act === 'II') targetZone = 'mathura';
        else if (act === 'III') targetZone = 'ashram';
        else if (act === 'IV') targetZone = 'dwarka';
      }
    }

    if (targetZone && targetZone !== synthRef.current.activeZone) {
      synthRef.current.activeZone = targetZone;
      const now = ctx.currentTime;

      // Trigger conch shell announcement when transition gate activates
      if (targetZone === 'transition') {
        playConchShell(ctx, gains.transition);
      }

      // Smooth crossfade: Active zone ramps to 1.0, inactive ramps to 0.001
      Object.keys(gains).forEach(zone => {
        const gainNode = gains[zone];
        if (zone === targetZone) {
          gainNode.gain.setValueAtTime(gainNode.gain.value, now);
          gainNode.gain.linearRampToValueAtTime(1.0, now + 1.8);
        } else {
          gainNode.gain.setValueAtTime(gainNode.gain.value, now);
          gainNode.gain.linearRampToValueAtTime(0.001, now + 1.8);
        }
      });
    }
  }, [activeIndex, showActGate, gateAct, chapters]);

  // Synthesize conch shell swell
  const playConchShell = (ctx, targetGainNode) => {
    const now = ctx.currentTime;
    
    // Conch synth uses low sawtooth drone swept with high Q bandpass filter
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(130, now + 1.0);
    osc.frequency.linearRampToValueAtTime(115, now + 2.8);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 7.0;
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.linearRampToValueAtTime(360, now + 1.2);
    filter.frequency.linearRampToValueAtTime(300, now + 2.8);

    const conchGain = ctx.createGain();
    conchGain.gain.setValueAtTime(0.001, now);
    conchGain.gain.linearRampToValueAtTime(0.16, now + 1.0); // conch swell
    conchGain.gain.setValueAtTime(0.16, now + 1.8);
    conchGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2); // fade out

    osc.connect(filter);
    filter.connect(conchGain);
    conchGain.connect(targetGainNode);

    osc.start(now);
    osc.stop(now + 3.3);
  };

  const cleanupSynth = () => {
    if (synthRef.current) {
      const { ctx, timers } = synthRef.current;
      timers.forEach(t => clearInterval(t));
      if (ctx) {
        ctx.close().catch(e => console.log("AudioContext close error:", e));
      }
      synthRef.current = null;
    }
  };

  return null; // pure headless background audio coordinator
}
