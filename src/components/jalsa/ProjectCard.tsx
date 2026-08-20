'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { JalsaProject } from '@/data/jalsaData';

interface ProjectCardProps {
  lng: string;
  project: JalsaProject;
}

export default function ProjectCard({ lng, project }: ProjectCardProps) {
  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const getLocalized = (obj?: { ar: string; en: string; fr: string }) => {
    if (!obj) return '';
    return isAr ? obj.ar : isFr ? obj.fr : obj.en;
  };

  const firstMajlis = project.majalis[0];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-[32px] bg-gradient-to-b from-[#0B3B2C]/80 via-[#0A261A]/90 to-[#0A0D0B] border-2 border-gold/40 hover:border-gold p-8 shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-xl"
    >
      {/* Decorative Golden Corner */}
      <div className="absolute top-0 right-0 w-28 h-28 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
          <path d="M100 0 L100 50 L75 50 L75 25 L25 25 L25 0 Z" />
        </svg>
      </div>

      {/* Top Section */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
            {project.icon}
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/20 text-gold border border-gold/30">
              {getLocalized(project.badge)}
            </span>
            <span className="text-[11px] font-mono text-emerald-300/80">
              {project.completedMajalis} / {project.totalMajalis} {isAr ? 'مجالس مسجلة' : 'Recorded Sessions'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className={`text-2xl md:text-3xl font-bold text-white group-hover:text-gold transition-colors ${isAr ? 'font-calligraphy' : 'font-display'}`}>
            {getLocalized(project.title)}
          </h3>

          <p className="text-xs text-gold/70 font-mono flex items-center gap-1">
            <span>📚</span>
            <span>{getLocalized(project.scholarlySource)}</span>
          </p>
        </div>

        <p className="text-base text-emerald-100/80 font-amiri leading-relaxed line-clamp-3">
          {getLocalized(project.description)}
        </p>

        {/* Featured Majlis Highlight */}
        {firstMajlis && (
          <div className="p-4 rounded-2xl bg-black/40 border border-gold/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-gold/90">
              <span className="font-bold flex items-center gap-1.5">
                <span>🎙️</span>
                <span>{getLocalized(firstMajlis.title)}</span>
              </span>
              <span className="font-mono text-emerald-300 text-[11px]">⏳ {firstMajlis.duration}</span>
            </div>
            <p className="text-xs text-gray-300 font-amiri line-clamp-1">
              {getLocalized(firstMajlis.subtitle)}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-6 mt-6 border-t border-gold/20 flex flex-wrap items-center gap-3 relative z-10">
        {firstMajlis && (
          <Link
            href={`/${lng}/jalsa/${project.slug}/${firstMajlis.slug}`}
            className="flex-1 px-4 py-3 rounded-xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all text-center shadow-lg flex items-center justify-center gap-2"
          >
            <span>▶</span>
            <span>{isAr ? 'استمع للمجلس الأول' : isFr ? 'Écouter le 1er Majlis' : 'Listen to Majlis 1'}</span>
          </Link>
        )}

        <Link
          href={`/${lng}/jalsa/${project.slug}`}
          className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gold font-bold text-sm border border-gold/30 transition-all text-center"
        >
          {isAr ? 'تفاصيل المشروع' : isFr ? 'Détails' : 'Details'}
        </Link>
      </div>
    </motion.div>
  );
}
