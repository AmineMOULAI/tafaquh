'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JalsaHero from './JalsaHero';
import ProjectCard from './ProjectCard';
import { JALSA_PROJECTS } from '@/data/jalsaData';

interface JalsaClientViewProps {
  lng: string;
}

export default function JalsaClientView({ lng }: JalsaClientViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const getLocalized = (obj?: { ar: string; en: string; fr: string }) => {
    if (!obj) return '';
    return isAr ? obj.ar : isFr ? obj.fr : obj.en;
  };

  const filteredProjects = JALSA_PROJECTS.filter((p) => {
    if (selectedFilter !== 'all' && p.slug !== selectedFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = getLocalized(p.title).toLowerCase().includes(q);
    const descMatch = getLocalized(p.description).toLowerCase().includes(q);
    const sourceMatch = getLocalized(p.scholarlySource).toLowerCase().includes(q);
    return titleMatch || descMatch || sourceMatch;
  });

  return (
    <div className="min-h-screen bg-[#0A0D0B] text-[#FDFBF7] flex flex-col justify-between selection:bg-gold selection:text-primary">
      <Header lng={lng} />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-6xl flex-1">
        {/* Majestic Hero Banner */}
        <JalsaHero lng={lng} totalProjects={JALSA_PROJECTS.length} totalRecordings={2} />

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-8 p-4 rounded-3xl bg-black/40 border border-gold/30 backdrop-blur-xl">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-gold text-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-white/5 text-gold/80 hover:bg-white/10'
              }`}
            >
              {isAr ? '🌟 كل المشاريع' : isFr ? '🌟 Tous les Projets' : '🌟 All Projects'}
            </button>

            {JALSA_PROJECTS.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedFilter(p.slug)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedFilter === p.slug
                    ? 'bg-gold text-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-white/5 text-gold/80 hover:bg-white/10'
                }`}
              >
                <span>{p.icon} </span>
                <span>{getLocalized(p.title)}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-64 relative">
            <input
              type="text"
              placeholder={isAr ? 'ابحث في المشاريع والمجالس...' : 'Search projects...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-gold/30 text-white placeholder-white/40 text-xs font-amiri focus:outline-none focus:border-gold transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50 text-xs">🔍</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} lng={lng} project={project} />
          ))}
        </div>

        {/* Telegram Community Callout */}
        <div className="mt-16 p-8 rounded-[36px] bg-gradient-to-r from-[#0B3B2C] via-[#14532D] to-[#0A261A] border-2 border-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold">
              <span>🎙️</span>
              <span>{isAr ? 'البث المباشر والمجالس الصوتية' : 'Live Voice Circles'}</span>
            </div>
            <h3 className={`text-2xl md:text-3xl font-bold text-white ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {isAr ? 'انضم إلى مجموعة تفقه على تيليجرام' : 'Join Tafaqquh Telegram Group'}
            </h3>
            <p className="text-sm text-emerald-100/90 font-amiri max-w-xl leading-relaxed">
              {isAr
                ? 'استمع إلى التسجيلات الكاملة، شارك بملاحظاتك الصوتية، وكن جزءاً من حلقات المدارسة المستمرة في الأربعين النووية وغريب القرآن.'
                : 'Listen to full recordings, participate with voice notes, and take part in ongoing study circles in Hadith and Quranic studies.'}
            </p>
          </div>

          <a
            href="https://t.me/center_tafaquh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-gold text-primary font-bold text-base hover:bg-gold-light transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center gap-3 flex-shrink-0"
          >
            <span>💬</span>
            <span>{isAr ? 'دخول مجموعة تفقه @center_tafaquh' : 'Join @center_tafaquh'}</span>
          </a>
        </div>
      </main>

      <Footer lng={lng} />
    </div>
  );
}
