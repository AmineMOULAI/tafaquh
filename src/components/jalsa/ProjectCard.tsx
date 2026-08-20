'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { JalsaProject } from '@/data/jalsaData';
import { PlayIcon, BookIcon, ScrollIcon, ClockIcon, StarGeometricIcon } from './Icons';

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
      className="group relative rounded-[32px] bg-gradient-to-b from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#0A0D0B] border-2 border-gold/40 hover:border-gold p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-xl"
    >
      {/* Decorative Golden Geometric Corner */}
      <div className="absolute top-0 right-0 w-28 h-28 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
          <path d="M100 0 L100 50 L75 50 L75 25 L25 25 L25 0 Z" />
        </svg>
      </div>

      {/* Top Section */}
      <div className="space-y-6 relative z-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-inner group-hover:scale-110 transition-transform">
              {project.iconName === 'scroll' ? <ScrollIcon className="w-6 h-6" /> : <BookIcon className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest block">
                {project.category}
              </span>
              <span className="text-xs text-gold/80 font-mono">
                {project.completedMajalis} / {project.totalMajalis} {isAr ? 'مجالس' : 'Sessions'}
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/20 text-gold border border-gold/30 flex items-center gap-1.5">
            <StarGeometricIcon className="w-3 h-3 text-gold" />
            <span>{getLocalized(project.badge)}</span>
          </span>
        </div>

        {/* Poster Image Preview */}
        {project.posterImage && (
          <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden border border-gold/30 shadow-lg group-hover:border-gold transition-colors">
            <Image
              src={project.posterImage}
              alt={getLocalized(project.title)}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-gold/30 font-bold">
                {getLocalized(project.scholarlySource).split(' ')[0]}...
              </span>
              {firstMajlis && (
                <span className="flex items-center gap-1 text-gold font-mono bg-black/60 px-2 py-1 rounded-lg border border-gold/20">
                  <ClockIcon className="w-3 h-3" />
                  <span>{firstMajlis.duration}</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className={`text-2xl md:text-3xl font-bold text-white group-hover:text-gold transition-colors ${isAr ? 'font-calligraphy' : 'font-display'}`}>
            {getLocalized(project.title)}
          </h3>

          <p className="text-xs text-gold/70 font-mono flex items-center gap-1.5">
            <BookIcon className="w-3.5 h-3.5 text-gold/60" />
            <span>{getLocalized(project.scholarlySource)}</span>
          </p>
        </div>

        <p className="text-sm md:text-base text-emerald-100/80 font-amiri leading-relaxed line-clamp-2">
          {getLocalized(project.description)}
        </p>

        {/* Active Majlis 1 Banner */}
        {firstMajlis && (
          <div className="p-3.5 rounded-2xl bg-black/50 border border-gold/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-bold text-gold block font-amiri">
                  {getLocalized(firstMajlis.title)}
                </span>
                <span className="text-[11px] text-gray-300 font-amiri line-clamp-1">
                  {getLocalized(firstMajlis.subtitle)}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-300 flex-shrink-0">
              {firstMajlis.duration}
            </span>
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
            <PlayIcon className="w-4 h-4" />
            <span>{isAr ? 'استمع للمجلس الأول' : isFr ? 'Écouter le 1er Majlis' : 'Listen to Majlis 1'}</span>
          </Link>
        )}

        <Link
          href={`/${lng}/jalsa/${project.slug}`}
          className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gold font-bold text-sm border border-gold/30 transition-all text-center"
        >
          {isAr ? 'عرض كافة المجالس' : isFr ? 'Tous les Majalis' : 'All Sessions'}
        </Link>
      </div>
    </motion.div>
  );
}
