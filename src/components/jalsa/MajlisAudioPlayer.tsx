'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MajlisAudioPlayerProps {
  lng: string;
  title: string;
  subtitle?: string;
  durationSeconds: number;
  audioUrl?: string;
  telegramPostUrl?: string;
  currentTimestamp?: number;
  onSeek?: (seconds: number) => void;
}

export default function MajlisAudioPlayer({
  lng,
  title,
  subtitle,
  durationSeconds = 2400,
  audioUrl,
  telegramPostUrl = 'https://t.me/center_tafaquh',
  currentTimestamp,
  onSeek,
}: MajlisAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudioFile, setHasAudioFile] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthOscillatorRef = useRef<OscillatorNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external seek requests (e.g. clicking a chapter in the notes)
  useEffect(() => {
    if (typeof currentTimestamp === 'number' && currentTimestamp >= 0) {
      seekTo(currentTimestamp);
    }
  }, [currentTimestamp]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(durationSeconds, seconds));
    setCurrentTime(clamped);
    if (audioRef.current && hasAudioFile) {
      audioRef.current.currentTime = clamped;
    }
    if (onSeek) onSeek(clamped);
  };

  const stopSynth = () => {
    if (synthGainRef.current && audioContextRef.current) {
      try {
        synthGainRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1);
      } catch {
        // ignore
      }
    }
  };

  const startSynth = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!synthGainRef.current) {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05 * volume, ctx.currentTime);
        gain.connect(ctx.destination);
        synthGainRef.current = gain;
      }

      // Atmospheric spiritual ambient tone generator
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      // Harmonic 432Hz calming tone
      osc.frequency.setValueAtTime(216, ctx.currentTime);
      osc.connect(synthGainRef.current);
      osc.start();
      synthOscillatorRef.current = osc;
    } catch {
      // AudioContext fallback ignored
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current && hasAudioFile) {
        audioRef.current.pause();
      }
      stopSynth();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      if (audioRef.current && hasAudioFile) {
        audioRef.current.play().catch(() => {
          setHasAudioFile(false);
          startSynth();
        });
      } else {
        startSynth();
      }
    }
  };

  // Timer loop for tracking playback progress
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + playbackRate;
          if (next >= durationSeconds) {
            setIsPlaying(false);
            stopSynth();
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate, durationSeconds]);

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current && hasAudioFile) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleSkip = (seconds: number) => {
    seekTo(currentTime + seconds);
  };

  const progressPercent = durationSeconds > 0 ? (currentTime / durationSeconds) * 100 : 0;

  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="w-full bg-gradient-to-br from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#0A0D0B] border-2 border-gold/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden text-bg-paper selection:bg-gold selection:text-primary">
      {/* Background Islamic Star Motif */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          {[...Array(8)].map((_, i) => (
            <rect key={i} x="15" y="15" width="70" height="70" transform={`rotate(${i * 22.5} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Hidden audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onError={() => setHasAudioFile(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
        />
      )}

      {/* Player Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center text-2xl text-gold shadow-inner flex-shrink-0">
            🎙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gold/20 text-gold border border-gold/30">
                {isAr ? 'تسجيل صوتي للمجلس' : isFr ? 'Enregistrement de la session' : 'Session Audio Recording'}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {isAr ? 'قيد التشغيل' : isFr ? 'En lecture' : 'Playing'}
                </span>
              )}
            </div>
            <h3 className={`text-xl md:text-2xl font-bold text-white mt-1 ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {title}
            </h3>
            {subtitle && <p className="text-xs text-gold/70 font-amiri mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Telegram Direct Group CTA */}
        <a
          href={telegramPostUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700/60 to-emerald-900/80 border border-gold/40 text-gold hover:text-white hover:border-gold transition-all text-xs font-bold shadow-md group"
        >
          <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.99-.73 3.84-1.67 6.4-2.77 7.67-3.3 3.64-1.51.4-.21.9-.21.11 0 .35.02.5.07.13.04.22.11.26.21.04.09.05.21.02.32z"/>
          </svg>
          <span>{isAr ? 'المجلس في تيليجرام تفقه' : isFr ? 'Session sur Telegram Tafaqquh' : 'Session on Telegram Tafaqquh'}</span>
        </a>
      </div>

      {/* Animated Waveform Visualizer */}
      <div className="flex items-center justify-center gap-1.5 h-12 my-4 px-2 py-1 bg-black/40 rounded-2xl border border-gold/20 overflow-hidden">
        {[...Array(36)].map((_, i) => {
          const barHeight = isPlaying
            ? Math.max(15, Math.sin((i + currentTime) * 0.4) * 80 + Math.cos(i * 0.7) * 20)
            : 10 + (i % 4) * 5;
          const isActive = (i / 36) * 100 <= progressPercent;

          return (
            <motion.div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-150 ${
                isActive ? 'bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'bg-gold/20'
              }`}
              style={{
                height: `${Math.min(100, Math.max(10, barHeight))}%`,
              }}
            />
          );
        })}
      </div>

      {/* Scrubber / Progress Bar */}
      <div className="space-y-2 mb-6">
        <div className="relative w-full h-3 bg-black/60 rounded-full overflow-hidden border border-gold/30 cursor-pointer group">
          <input
            type="range"
            min="0"
            max={durationSeconds}
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div
            className="h-full bg-gradient-to-r from-gold via-gold-light to-amber-300 transition-all duration-75 relative z-10"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-mono text-gold/80 px-1">
          <span>{formatTime(currentTime)}</span>
          <span className="text-white/40">/</span>
          <span>{formatTime(durationSeconds)}</span>
        </div>
      </div>

      {/* Controls: Play, Skip, Speed, Volume */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gold/20">
        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-gold/20">
          {speedOptions.map((speed) => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                playbackRate === speed
                  ? 'bg-gold text-primary shadow-sm'
                  : 'text-gold/60 hover:text-gold hover:bg-gold/10'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>

        {/* Main Transport Buttons */}
        <div className="flex items-center gap-3">
          {/* Skip Back 10s */}
          <button
            onClick={() => handleSkip(-10)}
            title={isAr ? 'تأخير 10 ثوانٍ' : 'Skip Back 10s'}
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 flex items-center justify-center text-gold hover:text-white transition-all active:scale-95 text-xs font-bold"
          >
            -10s
          </button>

          {/* Big Play / Pause Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-gold via-gold-light to-amber-400 text-primary shadow-[0_0_25px_rgba(212,175,55,0.7)] flex items-center justify-center text-2xl font-bold transition-all"
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>

          {/* Skip Forward 10s */}
          <button
            onClick={() => handleSkip(10)}
            title={isAr ? 'تقديم 10 ثوانٍ' : 'Skip Forward 10s'}
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 flex items-center justify-center text-gold hover:text-white transition-all active:scale-95 text-xs font-bold"
          >
            +10s
          </button>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-gold/80 hover:text-gold text-lg transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? '🔇' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
            className="w-20 h-1.5 bg-black/60 rounded-full accent-gold cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
