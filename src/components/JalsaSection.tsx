'use client';

import React from 'react';
import Link from 'next/link';
import { JALSA_PROJECTS } from '@/data/jalsaData';
import ProjectCard from './jalsa/ProjectCard';
import { StarGeometricIcon, MicrophoneIcon } from './jalsa/Icons';

export default function JalsaSection({ lng }: { lng: string }) {
  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const sectionTitle = isAr ? 'جلسات تفقه (JALSA)' : isFr ? 'Sessions Tafaqquh (Jalsa)' : 'Tafaqquh Study Circles (Jalsa)';
  const sectionSubtitle = isAr
    ? "حلقات مدارسة علمية وتدبرية تجمع بين تأصيل السنة وبلاغة القرآن مصحوبة بالتسجيلات الصوتية"
    : isFr
    ? "Cercles d'étude et de méditation alliant authenticité de la Sunnah et éloquence du Coran avec enregistrements audio"
    : "Systematic study circles uniting Sunnah depth and Quranic eloquence with interactive audio recordings";

  return (
    <section className="py-28 bg-gradient-to-b from-[#0A0D0B] via-[#0B3B2C]/40 to-[#0A0D0B] relative overflow-hidden border-y border-gold/20" id="jalsa">
      {/* Decorative Islamic Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%23D4AF37' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase">
            <MicrophoneIcon className="w-3.5 h-3.5 text-gold" />
            <span>{isAr ? 'المجالس العلمية والتسجيلات الرسمية' : 'Study Circles & Audio Records'}</span>
          </div>

          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-gold tracking-tight ${isAr ? 'font-calligraphy' : 'font-display uppercase'}`}>
            {sectionTitle}
          </h2>

          <p className="text-lg md:text-xl text-emerald-100/80 font-amiri leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JALSA_PROJECTS.map((project) => (
            <ProjectCard key={project.id} lng={lng} project={project} />
          ))}
        </div>

        {/* Link to Jalsa Hub */}
        <div className="text-center pt-6">
          <Link
            href={`/${lng}/jalsa`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-400 text-primary font-bold text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
          >
            <StarGeometricIcon className="w-4 h-4 text-primary" />
            <span>{isAr ? 'استكشف كافة مشاريع ومجالس تفقه' : 'Explore All Tafaqquh Majalis'}</span>
            <span>{isAr ? '←' : '→'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
