'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { useGlobalAudio, AudioTrack } from '@/context/GlobalAudioContext';
import {
  PlayIcon,
  PauseIcon,
  MicrophoneIcon,
  TelegramIcon,
  StarGeometricIcon,
  VolumeHighIcon,
  VolumeMuteIcon,
} from './Icons';

const SkipBack15Icon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-5-5 5-5" />
    <path d="M18 17l-5-5 5-5" />
  </svg>
);

const SkipForward15Icon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 17l5-5-5-5" />
    <path d="M6 17l5-5-5-5" />
  </svg>
);

interface MajlisAudioPlayerProps {
  lng: string;
  title: string;
  subtitle?: string;
  durationSeconds: number;
  audioUrl?: string;
  telegramPostUrl?: string;
  currentTimestamp?: number;
  projectSlug?: string;
  majlisSlug?: string;
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
  projectSlug,
  majlisSlug,
  onSeek,
}: MajlisAudioPlayerProps) {
  const { theme } = useApp();
  const {
    currentTrack,
    isPlaying: isGlobalPlaying,
    currentTime: globalCurrentTime,
    duration: globalDuration,
    playbackRate,
    volume,
    isMuted,
    isLoading,
    playTrack,
    togglePlay: toggleGlobalPlay,
    seekTo: globalSeekTo,
    skipBy,
    setPlaybackRate,
    setVolume,
    toggleMute,
  } = useGlobalAudio();

  const isCurrentTrackActive = currentTrack?.audioUrl === audioUrl || currentTrack?.title === title;
  const isPlaying = isCurrentTrackActive && isGlobalPlaying;
  const currentTime = isCurrentTrackActive ? globalCurrentTime : 0;
  const duration = isCurrentTrackActive && globalDuration > 0 ? globalDuration : durationSeconds;

  // Sync external seek requests (e.g. clicking a chapter in the notes)
  useEffect(() => {
    if (typeof currentTimestamp === 'number' && currentTimestamp >= 0) {
      if (isCurrentTrackActive) {
        globalSeekTo(currentTimestamp);
      }
    }
  }, [currentTimestamp, isCurrentTrackActive]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (!audioUrl) return;

    if (isCurrentTrackActive) {
      toggleGlobalPlay();
    } else {
      const track: AudioTrack = {
        id: `${projectSlug || ''}-${majlisSlug || ''}-${title}`,
        title,
        subtitle,
        audioUrl,
        projectSlug,
        majlisSlug,
        durationSeconds,
        telegramPostUrl,
      };
      playTrack(track, true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    if (isCurrentTrackActive) {
      globalSeekTo(targetTime);
    } else {
      const track: AudioTrack = {
        id: `${projectSlug || ''}-${majlisSlug || ''}-${title}`,
        title,
        subtitle,
        audioUrl: audioUrl || '',
        projectSlug,
        majlisSlug,
        durationSeconds,
        telegramPostUrl,
      };
      playTrack(track, true);
      setTimeout(() => globalSeekTo(targetTime), 100);
    }
    if (onSeek) onSeek(targetTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
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
          <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Top Bar: Live Status & Format Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gold/20 text-gold flex items-center justify-center border border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <MicrophoneIcon className="w-5 h-5" />
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-primary animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono tracking-widest text-gold uppercase">
                  {isAr ? 'التسجيل الصوتي الرسمي' : isFr ? 'Enregistrement Officiel' : 'Official Recording'}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold/50" />
                <span className="text-[11px] text-emerald-400 font-mono">
                  {isPlaying ? (isAr ? 'جاري الاستماع...' : 'Playing...') : (isAr ? 'جاهز للاستماع' : 'Ready')}
                </span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Telegram Channel Link */}
            <a
              href={telegramPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#229ED9] border border-[#229ED9]/40 text-xs font-bold flex items-center gap-2 transition-all group"
            >
              <TelegramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{isAr ? 'قناة تيليجرام' : 'Telegram'}</span>
            </a>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="h-14 flex items-end justify-center gap-1 sm:gap-1.5 px-2 py-1 bg-black/20 rounded-2xl border border-gold/20 overflow-hidden">
          {Array.from({ length: 48 }).map((_, i) => {
            const barHeight = Math.sin((i / 48) * Math.PI) * 75 + Math.cos(i * 0.5) * 20;
            const dynamicHeight = isPlaying ? Math.max(15, (barHeight * (Math.sin(i + currentTime * 3) + 1.2)) / 2) : Math.max(10, barHeight * 0.4);
            const isPassed = (i / 48) * 100 <= progressPercent;

            return (
              <div
                key={i}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                  isPassed
                    ? 'bg-gradient-to-t from-gold via-gold-light to-amber-300 shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                    : theme === 'light'
                    ? 'bg-gold/25'
                    : 'bg-white/15'
                }`}
                style={{ height: `${dynamicHeight}%` }}
              />
            );
          })}
        </div>

        {/* Progress Slider & Time Labels */}
        <div className="space-y-2">
          <div className="relative flex items-center group cursor-pointer">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-gold/80 px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Primary Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Left: Speed Selector */}
          <div className="flex items-center gap-1.5 bg-black/30 border border-gold/30 rounded-2xl p-1">
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackRate(speed)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                  playbackRate === speed
                    ? 'bg-gold text-primary shadow-sm font-black'
                    : 'text-gold/70 hover:text-gold hover:bg-gold/10'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Center: Play / Pause & Skip Buttons */}
          <div className="flex items-center gap-3 md:gap-5 mx-auto">
            <button
              onClick={() => skipBy(-15)}
              className="p-2.5 rounded-2xl bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 hover:scale-105 transition-all"
              title={isAr ? 'تأخير 15 ثانية' : '-15s'}
            >
              <SkipBack15Icon className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              disabled={isLoading}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-gradient-to-tr from-gold via-gold-light to-amber-400 text-primary flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all border-2 border-gold-light/60 ${
                isLoading ? 'opacity-70 animate-pulse' : ''
              }`}
            >
              {isPlaying ? (
                <PauseIcon className="w-7 h-7 text-primary" />
              ) : (
                <PlayIcon className="w-7 h-7 text-primary ml-1" />
              )}
            </button>

            <button
              onClick={() => skipBy(15)}
              className="p-2.5 rounded-2xl bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 hover:scale-105 transition-all"
              title={isAr ? 'تقديم 15 ثانية' : '+15s'}
            >
              <SkipForward15Icon className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Volume & Mute */}
          <div className="flex items-center gap-2 bg-black/30 border border-gold/30 rounded-2xl px-3 py-1.5">
            <button
              onClick={toggleMute}
              className="text-gold/80 hover:text-gold transition-colors"
              title={isMuted ? 'إلغاء الكتم' : 'كتم'}
            >
              {isMuted ? <VolumeMuteIcon className="w-4 h-4" /> : <VolumeHighIcon className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 sm:w-20 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Global Persistence Notice */}
        <div className="pt-2 text-center">
          <span className="text-[11px] text-emerald-400/90 font-amiri font-bold flex items-center justify-center gap-1.5">
            <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
            <span>يمكنك مواصلة الاستماع لهذا المجلس أثناء تصفحك للموقع أو العودة للصفحة الرئيسية دون انقطاع.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
