'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JalsaProject } from '@/data/jalsaData';

interface JalsaProjectClientViewProps {
  lng: string;
  project: JalsaProject;
}

export default function JalsaProjectClientView({ lng, project }: JalsaProjectClientViewProps) {
  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const getLocalized = (obj?: { ar: string; en: string; fr: string }) => {
    if (!obj) return '';
    return isAr ? obj.ar : isFr ? obj.fr : obj.en;
  };

  return (
    <div className="min-h-screen bg-[#0A0D0B] text-[#FDFBF7] flex flex-col justify-between selection:bg-gold selection:text-primary">
      <Header lng={lng} />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-5xl flex-1 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gold/70 font-amiri pb-2 border-b border-gold/20">
          <Link href={`/${lng}`} className="hover:text-gold transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${lng}/jalsa`} className="hover:text-gold transition-colors">
            {isAr ? 'جلسات تفقه (JALSA)' : 'Jalsa'}
          </Link>
          <span>/</span>
          <span className="text-white font-bold">{getLocalized(project.title)}</span>
        </nav>

        {/* Project Header Banner */}
        <div className="p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-[#0B3B2C] via-[#14532D] to-[#0A261A] border-2 border-gold/40 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-5xl">{project.icon}</span>
            <span className="px-4 py-1.5 rounded-full bg-gold/20 text-gold border border-gold/40 font-bold text-xs">
              {getLocalized(project.badge)}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className={`text-3xl md:text-5xl font-bold text-white ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {getLocalized(project.title)}
            </h1>
            <p className="text-lg md:text-xl text-gold/90 font-amiri leading-relaxed">
              {getLocalized(project.subtitle)}
            </p>
          </div>

          <p className="text-base text-emerald-100/90 font-amiri leading-relaxed">
            {getLocalized(project.description)}
          </p>

          <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gold/90">
            <span>📚 {getLocalized(project.scholarlySource)}</span>
            <span>🎯 {project.completedMajalis} / {project.totalMajalis} {isAr ? 'مجالس منجزة' : 'Sessions Completed'}</span>
          </div>
        </div>

        {/* Majalis Sessions List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gold/20">
            <h2 className={`text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {isAr ? 'قائمة المجالس والمدارسات' : 'Sessions & Majalis'}
            </h2>
            <span className="text-xs text-gold/70 font-mono">
              {project.majalis.length} {isAr ? 'مجلس متوفر الآن' : 'Available Session'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {project.majalis.map((m) => (
              <div
                key={m.id}
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0B3B2C]/70 via-[#0A261A]/80 to-black/80 border-2 border-gold/30 hover:border-gold transition-all shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold">
                    <span className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center font-mono">
                      {m.sessionNumber}
                    </span>
                    <span>{getLocalized(m.theme)}</span>
                    <span>•</span>
                    <span className="text-emerald-300">⏳ {m.duration}</span>
                  </div>

                  <h3 className={`text-xl md:text-2xl font-bold text-white ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                    {getLocalized(m.title)}
                  </h3>

                  <p className="text-sm text-gray-300 font-amiri">
                    {getLocalized(m.subtitle)}
                  </p>
                </div>

                <Link
                  href={`/${lng}/jalsa/${project.slug}/${m.slug}`}
                  className="px-6 py-3.5 rounded-2xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg flex-shrink-0"
                >
                  <span>▶</span>
                  <span>{isAr ? 'دخول المجلس والاستماع' : 'Open Majlis & Listen'}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer lng={lng} />
    </div>
  );
}
