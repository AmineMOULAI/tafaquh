'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, MicrophoneIcon, TelegramIcon, StarGeometricIcon } from './Icons';

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
  telegramPostUrl = 'https://t.me/center_tafaqquh',
  currentTimestamp,
  onSeek,
}: MajlisAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [actualDuration, setActualDuration] = useState(durationSeconds);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync external seek requests (e.g. clicking a chapter in the notes)
  useEffect(() => {
    if (typeof currentTimestamp === 'number' && currentTimestamp >= 0) {
      seekTo(currentTimestamp);
    }
  }, [currentTimestamp]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(actualDuration, seconds));
    setCurrentTime(clamped);
    if (audioRef.current) {
      audioRef.current.currentTime = clamped;
    }
    if (onSeek) onSeek(clamped);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback error:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setActualDuration(audioRef.current.duration);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleSkip = (seconds: number) => {
    seekTo(currentTime + seconds);
  };

  const progressPercent = actualDuration > 0 ? (currentTime / actualDuration) * 100 : 0;

  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="w-full bg-gradient-to-br from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#0A0D0B] border-2 border-gold/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden text-bg-paper">
      {/* Background Islamic Star Motif */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          {[...Array(8)].map((_, i) => (
            <rect key={i} x="15" y="15" width="70" height="70" transform={`rotate(${i * 22.5} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Real HTML5 Audio Element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
        />
      )}

      {/* Player Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-inner flex-shrink-0">
            <MicrophoneIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gold/20 text-gold border border-gold/30 flex items-center gap-1">
                <StarGeometricIcon className="w-2.5 h-2.5 text-gold" />
                <span>{isAr ? 'تسجيل صوتي للمجلس' : isFr ? 'Enregistrement Audio' : 'Session Recording'}</span>
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isAr ? 'قيد التشغيل' : isFr ? 'En cours' : 'Playing'}</span>
                </span>
              )}
            </div>
            <h3 className={`text-xl md:text-2xl font-bold text-white mt-1 ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {title}
            </h3>
            {subtitle && <p className="text-xs text-gold/70 font-amiri mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Telegram Direct Group Link */}
        <a
          href={telegramPostUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800/60 to-emerald-950/80 border border-gold/40 text-gold hover:text-white hover:border-gold transition-all text-xs font-bold shadow-md group flex-shrink-0"
        >
          <TelegramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>{isAr ? 'المجلس في تيليجرام تفقه' : isFr ? 'Session sur Telegram Tafaqquh' : 'Session on Telegram'}</span>
        </a>
      </div>

      {/* Animated Waveform Visualizer */}
      <div className="flex items-center justify-center gap-1.5 h-12 my-4 px-2 py-1 bg-black/40 rounded-2xl border border-gold/20 overflow-hidden">
        {[...Array(36)].map((_, i) => {
          const barHeight = isPlaying
            ? Math.max(15, Math.sin((i + currentTime * 2) * 0.4) * 80 + Math.cos(i * 0.7) * 20)
            : 12 + (i % 4) * 4;
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
            max={actualDuration}
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
          <span>{formatTime(actualDuration)}</span>
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
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 flex items-center justify-center text-gold hover:text-white transition-all active:scale-95 text-xs font-mono font-bold"
          >
            -10s
          </button>

          {/* Big Play / Pause Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-gold via-gold-light to-amber-400 text-primary shadow-[0_0_25px_rgba(212,175,55,0.7)] flex items-center justify-center text-lg font-bold transition-all"
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-0.5" />}
          </motion.button>

          {/* Skip Forward 10s */}
          <button
            onClick={() => handleSkip(10)}
            title={isAr ? 'تقديم 10 ثوانٍ' : 'Skip Forward 10s'}
            className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 flex items-center justify-center text-gold hover:text-white transition-all active:scale-95 text-xs font-mono font-bold"
          >
            +10s
          </button>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !isMuted;
              }
              setIsMuted(!isMuted);
            }}
            className="text-gold/80 hover:text-gold text-sm transition-colors"
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
              const val = Number(e.target.value);
              setVolume(val);
              setIsMuted(false);
              if (audioRef.current) {
                audioRef.current.volume = val;
                audioRef.current.muted = false;
              }
            }}
            className="w-20 h-1.5 bg-black/60 rounded-full accent-gold cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
