'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { useApp } from '@/context/AppContext';
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMuteIcon,
  StarGeometricIcon,
} from './Icons';

const SkipBack10Icon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-5-5 5-5" />
    <path d="M18 17l-5-5 5-5" />
  </svg>
);

const SkipForward10Icon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 17l5-5-5-5" />
    <path d="M6 17l5-5-5-5" />
  </svg>
);

const MinimizeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="14" x2="10" y2="14" />
    <line x1="10" y1="14" x2="10" y2="20" />
    <line x1="20" y1="10" x2="14" y2="10" />
    <line x1="14" y1="10" x2="14" y2="4" />
  </svg>
);

const MaximizeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const CloseIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AudioBars = ({ isPlaying = false }: { isPlaying?: boolean }) => (
  <div className="flex items-center gap-0.5 h-4">
    {[0.4, 0.8, 1, 0.6, 0.3].map((height, i) => (
      <div
        key={i}
        className={`w-0.5 rounded-full bg-gold transition-all duration-200 ${
          isPlaying ? 'animate-pulse' : 'opacity-40'
        }`}
        style={{
          height: isPlaying ? `${Math.max(20, height * 100)}%` : '30%',
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

export default function GlobalFloatingAudioPlayer({ lng = 'ar' }: { lng?: string }) {
  const { theme } = useApp();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    isLoading,
    isPlayerVisible,
    isMinimized,
    togglePlay,
    seekTo,
    skipBy,
    setPlaybackRate,
    setVolume,
    toggleMute,
    closePlayer,
    toggleMinimize,
  } = useGlobalAudio();

  if (!isPlayerVisible || !currentTrack) return null;

  const isAr = lng === 'ar';
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const fullMajlisUrl = currentTrack.projectSlug && currentTrack.majlisSlug
    ? `/${lng}/jalsa/${currentTrack.projectSlug}/${currentTrack.majlisSlug}`
    : currentTrack.projectSlug
    ? `/${lng}/jalsa/${currentTrack.projectSlug}`
    : `/${lng}/jalsa`;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 left-0 right-0 z-50 px-3 md:px-6 pointer-events-none font-subtitle">
        <div className="container mx-auto max-w-4xl pointer-events-auto">
          {isMinimized ? (
            /* Minimized Floating Pill */
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className={`flex items-center justify-between gap-3 p-3 rounded-full border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.35)] backdrop-blur-xl ${
                theme === 'light'
                  ? 'bg-white/95 text-[#102B20]'
                  : 'bg-[#04120D]/95 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary flex items-center justify-center shadow-md hover:scale-105 transition-transform flex-shrink-0"
                >
                  {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-xs text-gold truncate max-w-[200px] sm:max-w-[300px]">
                    {currentTrack.title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AudioBars isPlaying={isPlaying} />
                <button
                  onClick={toggleMinimize}
                  className="p-2 rounded-full hover:bg-gold/20 text-gold transition-colors"
                  title="تكبير المشغل"
                >
                  <MaximizeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={closePlayer}
                  className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  title="إغلاق المشغل"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Full Floating Glass Player Bar */
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className={`rounded-[28px] border-2 border-gold/40 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-4 sm:p-5 relative overflow-hidden space-y-3 ${
                theme === 'light'
                  ? 'bg-[#FFFDF9]/95 text-[#102B20]'
                  : 'bg-[#04120D]/95 text-white'
              }`}
            >
              {/* Top Golden Hairline */}
              <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent" />

              {/* Header: Title, Link to Notes, and Action Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-2xl bg-gold/20 text-gold border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <StarGeometricIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-right min-w-0">
                    <Link
                      href={fullMajlisUrl}
                      className="font-bold text-sm text-gold hover:text-white transition-colors truncate block"
                      title="فتح صفحة المجلس الكاملة والملاحظات"
                    >
                      {currentTrack.title}
                    </Link>
                    {currentTrack.subtitle && (
                      <span className="text-[11px] text-gray-400 truncate">
                        {currentTrack.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right controls: Speed, Minimize, Close */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Speed button */}
                  <div className="flex items-center gap-1 bg-gold/10 border border-gold/25 rounded-xl px-2 py-1 text-xs font-mono font-bold text-gold">
                    {[1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setPlaybackRate(rate)}
                        className={`px-1.5 py-0.5 rounded ${
                          playbackRate === rate ? 'bg-gold text-primary font-black' : 'hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={toggleMinimize}
                    className="p-2 rounded-xl bg-gold/10 hover:bg-gold/25 text-gold border border-gold/20 transition-all"
                    title="تصغير المشغل"
                  >
                    <MinimizeIcon className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={closePlayer}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 transition-all"
                    title="إيقاف وإغلاق"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Slider & Time Labels */}
              <div className="space-y-1">
                <div className="relative flex items-center group cursor-pointer">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => seekTo(Number(e.target.value))}
                    className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-gold/80 px-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Central Player Controls & Volume */}
              <div className="flex items-center justify-between pt-1">
                {/* Volume slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-gold/80 hover:text-gold p-1"
                    title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
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
                    className="w-16 sm:w-20 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none hidden sm:block"
                  />
                </div>

                {/* Primary Playback Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => skipBy(-10)}
                    className="p-2 rounded-xl hover:bg-gold/15 text-gold transition-colors"
                    title="رجوع 10 ثوانٍ"
                  >
                    <SkipBack10Icon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                    title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                  >
                    {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => skipBy(10)}
                    className="p-2 rounded-xl hover:bg-gold/15 text-gold transition-colors"
                    title="تقديم 10 ثوانٍ"
                  >
                    <SkipForward10Icon className="w-4 h-4" />
                  </button>
                </div>

                {/* Return link to reading text */}
                <Link
                  href={fullMajlisUrl}
                  className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
                >
                  <span>{isAr ? 'قراءة المتن' : 'Open Text'}</span>
                  <span>←</span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
