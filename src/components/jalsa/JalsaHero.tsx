'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StarGeometricIcon, ClockIcon, BookIcon, MicrophoneIcon } from './Icons';

interface JalsaHeroProps {
  lng: string;
  totalProjects: number;
  totalRecordings: number;
}

export default function JalsaHero({ lng, totalProjects, totalRecordings }: JalsaHeroProps) {
  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const title = isAr ? 'جَلَسَات تَفَقُّه' : isFr ? 'Sessions Tafaqquh (Jalsa)' : 'Tafaqquh Study Circles (Jalsa)';
  const subtitle = isAr
    ? "حلقات المدارسة العلمية والتدبرية المنهجية، مصحوبة بالتسجيلات الصوتية في تيليجرام"
    : isFr
    ? "Cercles d'étude et de méditation méthodiques, avec enregistrements audio interactifs sur Telegram"
    : "Methodical study circles and contemplation sessions with interactive voice recordings on Telegram";

  const badge = isAr ? "منصة المدارسة والمجالس العلمية" : isFr ? "Plateforme d'Étude & Majalis" : "Study Circles & Majalis Hub";

  return (
    <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-6 pb-10">
      {/* Decorative Gold Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-gold/50 bg-gradient-to-r from-[#0B3B2C]/60 to-[#14532D]/60 backdrop-blur-md shadow-lg"
      >
        <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
        <span className="text-xs font-bold font-calligraphy text-gold tracking-widest uppercase">
          {badge}
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gold-radiant drop-shadow-2xl ${
          isAr ? 'font-calligraphy' : 'font-display uppercase'
        }`}
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg md:text-2xl text-emerald-100/90 font-amiri max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>

      {/* Key Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4"
      >
        <div className="p-4 rounded-2xl bg-black/40 border border-gold/30 backdrop-blur-md flex flex-col items-center">
          <BookIcon className="w-5 h-5 text-gold mb-1" />
          <span className="block text-2xl md:text-3xl font-bold text-gold font-mono">{totalProjects}</span>
          <span className="text-xs text-gray-300 font-amiri">{isAr ? 'مشاريع علمية جارية' : 'Active Projects'}</span>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 border border-gold/30 backdrop-blur-md flex flex-col items-center">
          <MicrophoneIcon className="w-5 h-5 text-gold mb-1" />
          <span className="block text-2xl md:text-3xl font-bold text-gold font-mono">{totalRecordings}</span>
          <span className="text-xs text-gray-300 font-amiri">{isAr ? 'تسجيلات صوتية رسمية' : 'Official Audio Records'}</span>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 border border-gold/30 backdrop-blur-md flex flex-col items-center">
          <ClockIcon className="w-5 h-5 text-gold mb-1" />
          <span className="block text-2xl md:text-3xl font-bold text-gold font-mono">55+</span>
          <span className="text-xs text-gray-300 font-amiri">{isAr ? 'دقيقة مدارسة وتفصيل' : 'Minutes of Study'}</span>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 border border-gold/30 backdrop-blur-md flex flex-col items-center">
          <StarGeometricIcon className="w-5 h-5 text-gold mb-1" />
          <span className="block text-2xl md:text-3xl font-bold text-gold font-mono">100%</span>
          <span className="text-xs text-gray-300 font-amiri">{isAr ? 'تأصيل وتدبر منهجي' : 'Authentic Sourcing'}</span>
        </div>
      </motion.div>
    </div>
  );
}
