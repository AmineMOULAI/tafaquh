'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  PlayIcon,
  PauseIcon,
  MicrophoneIcon,
  TelegramIcon,
  StarGeometricIcon,
  VolumeHighIcon,
  VolumeMuteIcon,
} from './Icons';

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
  const { theme } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [actualDuration, setActualDuration] = useState(durationSeconds);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'mp3' | 'm4a' | 'ogg'>('mp3');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Compute active audio URL based on format
  const activeAudioUrl = React.useMemo(() => {
    if (!audioUrl) return '';
    return audioUrl.replace(/\.(mp3|m4a|ogg)$/, `.${selectedFormat}`);
  }, [audioUrl, selectedFormat]);

  // Sync external seek requests (e.g. clicking a chapter in the notes)
  useEffect(() => {
    if (typeof currentTimestamp === 'number' && currentTimestamp >= 0) {
      seekTo(currentTimestamp);
    }
  }, [currentTimestamp]);

  useEffect(() => {
    if (durationSeconds > 0) {
      setActualDuration(durationSeconds);
    }
  }, [durationSeconds]);

  // When activeAudioUrl changes, update audio src
  useEffect(() => {
    if (audioRef.current && activeAudioUrl) {
      const wasPlaying = isPlaying;
      audioRef.current.src = activeAudioUrl;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [activeAudioUrl]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(actualDuration || durationSeconds, seconds));
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
      setIsLoading(true);
      setHasError(false);

      if (!audioRef.current.src || audioRef.current.src === '') {
        audioRef.current.src = activeAudioUrl;
        audioRef.current.load();
      }

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          setHasError(false);
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
          setIsLoading(false);
          // Try fallback format
          if (selectedFormat === 'mp3') {
            setSelectedFormat('m4a');
          } else if (selectedFormat === 'm4a') {
            setSelectedFormat('ogg');
          } else {
            setHasError(true);
          }
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
      setActualDuration(audioRef.current.duration);
    }
    setIsLoading(false);
    setHasError(false);
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

  const progressPercent = (actualDuration || durationSeconds) > 0
    ? (currentTime / (actualDuration || durationSeconds)) * 100
    : 0;

  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      className={`w-full border-2 border-gold/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl relative overflow-hidden transition-all ${
        theme === 'light'
          ? 'bg-[#FFFDF9] text-[#123326] border-gold/60'
          : 'bg-gradient-to-br from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#0A0D0B] text-white'
      }`}
    >
      {/* Background Islamic Star Motif */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          {[...Array(8)].map((_, i) => (
            <rect key={i} x="15" y="15" width="70" height="70" transform={`rotate(${i * 22.5} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* HTML5 Audio Element with direct SRC and event handlers */}
      {activeAudioUrl && (
        <audio
          ref={audioRef}
          src={activeAudioUrl}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
            setHasError(false);
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            console.error("Audio error on format:", selectedFormat);
            if (selectedFormat === 'mp3') {
              setSelectedFormat('m4a');
            } else if (selectedFormat === 'm4a') {
              setSelectedFormat('ogg');
            } else {
              setIsLoading(false);
              setHasError(true);
            }
          }}
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
                <span>{isAr ? 'تسجيل صوتي رسمي' : isFr ? 'Enregistrement Audio Officiel' : 'Official Recording'}</span>
              </span>
              {isPlaying && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{isAr ? 'قيد التشغيل' : isFr ? 'En cours' : 'Playing'}</span>
                </span>
              )}
              {isLoading && (
                <span className="text-[10px] text-gold/80 font-mono animate-pulse font-bold">
                  {isAr ? 'جاري التحميل...' : 'Buffering...'}
                </span>
              )}
            </div>
            <h3
              className={`text-xl md:text-2xl font-bold mt-1 ${
                theme === 'light' ? 'text-[#123326]' : 'text-white'
              } ${isAr ? 'font-calligraphy' : 'font-display'}`}
            >
              {title}
            </h3>
            {subtitle && <p className="text-xs text-gold/80 font-amiri mt-0.5 font-bold">{subtitle}</p>}
          </div>
        </div>

        {/* Telegram Direct Group Link & Format Selector */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Format selector */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-gold/30 text-[10px] font-mono">
            {(['mp3', 'm4a', 'ogg'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all uppercase ${
                  selectedFormat === fmt
                    ? 'bg-gold text-primary shadow-sm'
                    : 'text-gold/60 hover:text-gold'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <a
            href={telegramPostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800/60 to-emerald-950/80 border border-gold/40 text-gold hover:text-white hover:border-gold transition-all text-xs font-bold shadow-md group"
          >
            <TelegramIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>{isAr ? 'تيليجرام تفقه' : 'Telegram'}</span>
          </a>
        </div>
      </div>

      {hasError && (
        <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-xs text-red-300 flex items-center justify-between">
          <span>{isAr ? 'يمكنك الاستماع مباشرة إلى المجلس عبر قناة تيليجرام تفقه الرسمية.' : 'You can listen directly on the official Tafaqquh Telegram channel.'}</span>
          <a href={telegramPostUrl} target="_blank" rel="noopener noreferrer" className="underline font-bold text-gold">
            {isAr ? 'فتح تيليجرام' : 'Open Telegram'}
          </a>
        </div>
      )}

      {/* Animated Waveform Visualizer */}
      <div className="flex items-center justify-center gap-1.5 h-12 my-4 px-2 py-1 bg-black/20 rounded-2xl border border-gold/20 overflow-hidden">
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
        <div className="relative w-full h-3 bg-black/30 rounded-full overflow-hidden border border-gold/30 cursor-pointer group">
          <input
            type="range"
            min="0"
            max={actualDuration || durationSeconds}
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div
            className="h-full bg-gradient-to-r from-gold via-gold-light to-amber-300 transition-all duration-75 relative z-10"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-mono text-gold font-bold px-1">
          <span>{formatTime(currentTime)}</span>
          <span className="text-gold/40">/</span>
          <span>{formatTime(actualDuration || durationSeconds)}</span>
        </div>
      </div>

      {/* Controls: Play, Skip, Speed, Volume */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gold/20">
        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-gold/20">
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

        {/* Volume & Mute with SVG Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !isMuted;
              }
              setIsMuted(!isMuted);
            }}
            className="text-gold/80 hover:text-gold p-1 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeMuteIcon className="w-4 h-4" /> : <VolumeHighIcon className="w-4 h-4" />}
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
            className="w-20 h-1.5 bg-black/40 rounded-full accent-gold cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
