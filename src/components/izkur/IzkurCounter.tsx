"use client";

import { motion } from "framer-motion";
import { DHIKR_PHRASES, DhikrPhraseId } from "@/utils/arabicSpeech";

interface IzkurCounterProps {
  currentPhraseId: DhikrPhraseId;
  count: number;
  targetGoal: number;
  isListening: boolean;
  onIncrement: (amount?: number) => void;
  onReset: () => void;
  isCompleted: boolean;
}

export default function IzkurCounter({
  currentPhraseId,
  count,
  targetGoal,
  isListening,
  onIncrement,
  onReset,
  isCompleted,
}: IzkurCounterProps) {
  const phrase = DHIKR_PHRASES[currentPhraseId];
  const progressPercent = Math.min(100, Math.round((count / targetGoal) * 100));

  // SVG Circle parameters
  const size = 280;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative py-6">
      {/* Central Counter Container */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onIncrement(1)}
        className="relative flex flex-col items-center justify-center focus:outline-none group cursor-pointer"
        aria-label="Tap to count Dhikr"
      >
        {/* SVG Circular Progress Ring */}
        <svg width={size} height={size} className="transform -rotate-90 drop-shadow-xl">
          {/* Outer Track Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#D4AF37"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Inner Content Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center rounded-full bg-[#0B3B2C]/40 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl group-hover:border-[#D4AF37] transition-all">
          {/* Title / Word اذْكُرْ */}
          <motion.span
            animate={isListening ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-calligraphy text-4xl text-[#D4AF37] tracking-wide mb-1 drop-shadow-md"
          >
            اذْكُرْ
          </motion.span>

          {/* Phrase Arabic Text */}
          <span className="font-amiri text-xl font-bold text-emerald-100 mb-2">
            {phrase.arabic}
          </span>

          {/* Current Count Number */}
          <span className="font-display text-5xl font-black text-white tracking-tight drop-shadow-lg">
            {count}
          </span>

          {/* Target Goal Progress */}
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]/90 mt-2">
            {count} / {targetGoal} ({progressPercent}%)
          </span>
        </div>

        {/* Pulse Aura Animation when Listening or Incremented */}
        {isListening && (
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/50 pointer-events-none"
          />
        )}
      </motion.button>

      {/* Completion Banner */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-600 text-[#0A0D0B] font-bold text-sm shadow-lg flex items-center gap-2"
        >
          <span>✨</span>
          <span>تم بحمد الله! اكتمل الهدف ({targetGoal})</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="ml-2 underline text-xs font-mono text-[#0A0D0B] hover:text-white"
          >
            إعادة
          </button>
        </motion.div>
      )}

      {/* Reset Action */}
      {!isCompleted && count > 0 && (
        <button
          onClick={onReset}
          className="mt-4 text-xs font-mono text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors underline"
        >
          إعادة ضبط العداد
        </button>
      )}
    </div>
  );
}
