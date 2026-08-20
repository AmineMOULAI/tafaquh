'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';
import { JalsaProject } from '@/data/jalsaData';
import {
  BookIcon,
  PlayIcon,
  ClockIcon,
  StarGeometricIcon,
  TelegramIcon,
} from './Icons';

interface JalsaProjectClientViewProps {
  lng: string;
  project: JalsaProject;
}

export default function JalsaProjectClientView({ lng, project }: JalsaProjectClientViewProps) {
  const { theme, navLayout } = useApp();
  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const getLocalized = (obj?: { ar: string; en: string; fr: string }) => {
    if (!obj) return '';
    return isAr ? obj.ar : isFr ? obj.fr : obj.en;
  };

  const isSidebar = navLayout === 'sidebar';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-gold selection:text-primary transition-all duration-300 ${
        theme === 'light' ? 'bg-[#FAF8F5] text-[#123326]' : 'bg-[#0A0D0B] text-[#FDFBF7]'
      } ${isSidebar ? (isAr ? 'lg:pr-72' : 'lg:pl-72') : ''}`}
    >
      <Header lng={lng} />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-6xl flex-1 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gold/80 font-amiri pb-2 border-b border-gold/20">
          <Link href={`/${lng}`} className="hover:text-gold transition-colors font-bold">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${lng}/jalsa`} className="hover:text-gold transition-colors font-bold">
            {isAr ? 'جلسات تفقه (JALSA)' : 'Jalsa'}
          </Link>
          <span>/</span>
          <span className="font-bold text-gold">{getLocalized(project.title)}</span>
        </nav>

        {/* Project Header Banner with Poster Picture */}
        <div
          className={`p-8 md:p-12 rounded-[36px] border-2 border-gold/40 shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden ${
            theme === 'light'
              ? 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F2EADB] text-[#123326]'
              : 'bg-gradient-to-br from-[#0B3B2C] via-[#14532D] to-[#0A261A] text-white'
          }`}
        >
          {/* Poster Image */}
          {project.posterImage && (
            <div className="relative w-full md:w-72 h-72 md:h-80 rounded-3xl overflow-hidden border-2 border-gold/50 shadow-2xl flex-shrink-0 group">
              <Image
                src={project.posterImage}
                alt={getLocalized(project.title)}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="px-3 py-1 rounded-full bg-gold text-primary font-bold text-[11px]">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 text-gold font-mono text-[11px] border border-gold/30">
                  {project.completedMajalis} / {project.totalMajalis}
                </span>
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold border border-gold/40 font-bold text-xs">
              <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
              <span>{getLocalized(project.badge)}</span>
            </div>

            <h1
              className={`text-3xl md:text-5xl font-bold tracking-tight ${
                theme === 'light' ? 'text-[#123326]' : 'text-white'
              } ${isAr ? 'font-calligraphy' : 'font-display'}`}
            >
              {getLocalized(project.title)}
            </h1>

            <p className="text-lg md:text-xl text-gold font-amiri leading-relaxed font-bold">
              {getLocalized(project.subtitle)}
            </p>

            <p
              className={`text-sm md:text-base font-amiri leading-relaxed ${
                theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/90'
              }`}
            >
              {getLocalized(project.description)}
            </p>

            <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gold font-bold">
              <span className="flex items-center gap-1.5">
                <BookIcon className="w-4 h-4 text-gold" />
                <span>{getLocalized(project.scholarlySource)}</span>
              </span>
              <span>
                {project.completedMajalis} / {project.totalMajalis} {isAr ? 'مجالس منجزة ومسجلة' : 'Sessions Completed'}
              </span>
            </div>
          </div>
        </div>

        {/* Majalis Sessions Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-gold/20">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                {isAr ? 'شبكة مجالس ومدارسات المشروع' : 'Project Sessions Grid'}
              </h2>
              <p
                className={`text-xs font-amiri mt-1 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}
              >
                {isAr
                  ? 'انقر على أي مجلس للاستماع للتسجيل الصوتي والاطلاع على الشرح والفوائد'
                  : 'Select a session to listen to the audio recording and explore the commentary'}
              </p>
            </div>

            <span className="text-xs text-gold font-mono font-bold">
              {project.majalis.length} {isAr ? 'مجالس في البرنامج' : 'Sessions in Curriculum'}
            </span>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.majalis.map((m, index) => {
              const isAvailable = m.isAvailable;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`rounded-3xl border-2 p-6 flex flex-col justify-between transition-all backdrop-blur-xl relative overflow-hidden ${
                    isAvailable
                      ? theme === 'light'
                        ? 'bg-[#FFFDF9] border-gold/50 shadow-lg hover:border-gold hover:-translate-y-1 text-[#123326]'
                        : 'bg-gradient-to-b from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#0A0D0B] border-gold/50 shadow-2xl hover:border-gold hover:-translate-y-1 text-white'
                      : theme === 'light'
                      ? 'bg-black/5 border-black/10 opacity-70'
                      : 'bg-black/40 border-white/10 opacity-75'
                  }`}
                >
                  {/* Decorative Islamic Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
                      <path d="M100 0 L100 40 L80 40 L80 20 L40 20 L40 0 Z" />
                    </svg>
                  </div>

                  <div className="space-y-4 relative z-10">
                    {/* Top Status */}
                    <div className="flex items-center justify-between">
                      <span className="w-9 h-9 rounded-xl bg-gold/20 text-gold font-bold font-mono text-sm flex items-center justify-center border border-gold/30">
                        {m.sessionNumber}
                      </span>

                      {isAvailable ? (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>{isAr ? 'تسجيل متاح' : 'Audio Available'}</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono text-gold/70 bg-white/5 border border-gold/20">
                          {isAr ? 'قريباً' : 'Coming Soon'}
                        </span>
                      )}
                    </div>

                    {/* Poster thumbnail if available */}
                    {m.posterImage && isAvailable && (
                      <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gold/30">
                        <Image
                          src={m.posterImage}
                          alt={getLocalized(m.title)}
                          fill
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Title & Subtitle */}
                    <div className="space-y-1.5">
                      <h3
                        className={`text-xl font-bold ${
                          theme === 'light' ? 'text-[#123326]' : 'text-white'
                        } ${isAr ? 'font-calligraphy' : 'font-display'}`}
                      >
                        {getLocalized(m.title)}
                      </h3>
                      <p
                        className={`text-xs font-amiri line-clamp-2 ${
                          theme === 'light' ? 'text-gray-600 font-bold' : 'text-gold/80'
                        }`}
                      >
                        {getLocalized(m.subtitle)}
                      </p>
                    </div>

                    {/* Duration & Theme */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-mono pt-2 border-t border-gold/20">
                      <span className="flex items-center gap-1 text-gold font-bold">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>{m.duration}</span>
                      </span>
                      <span className="truncate max-w-[140px] text-right text-[11px]">
                        {getLocalized(m.theme).split('،')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-5 mt-4 border-t border-gold/20 relative z-10">
                    {isAvailable ? (
                      <Link
                        href={`/${lng}/jalsa/${project.slug}/${m.slug}`}
                        className="w-full py-3 px-4 rounded-xl bg-gold text-primary font-bold text-xs md:text-sm hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <PlayIcon className="w-4 h-4" />
                        <span>{isAr ? 'دخول المجلس والاستماع' : 'Listen to Majlis'}</span>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 rounded-xl bg-white/5 text-gray-400 font-bold text-xs cursor-not-allowed border border-white/5 text-center"
                      >
                        {isAr ? 'المجلس قيد الإعداد' : 'Scheduled Soon'}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Telegram Community Bottom Box */}
        <div
          className={`p-8 rounded-3xl border-2 border-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 ${
            theme === 'light'
              ? 'bg-gradient-to-r from-[#FAF6ED] via-[#F2EADB] to-[#FAF6ED] text-[#123326]'
              : 'bg-gradient-to-r from-[#0B3B2C] via-[#14532D] to-[#0A261A] text-white'
          }`}
        >
          <div className="space-y-2">
            <h3 className={`text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {isAr ? 'حلقات النقاش والتسجيلات الصوتية' : 'Voice Sessions & Discussion'}
            </h3>
            <p
              className={`text-xs md:text-sm font-amiri max-w-xl leading-relaxed ${
                theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/90'
              }`}
            >
              {isAr
                ? 'تقام مجالس المدارسة عبر الرسائل والبث الصوتي في مجموعة تفقه على تيليجرام @center_tafaqquh'
                : 'Live study circles and voice notes take place directly in the Tafaqquh Telegram group @center_tafaqquh'}
            </p>
          </div>

          <a
            href="https://t.me/center_tafaqquh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all flex items-center gap-2 flex-shrink-0 shadow-lg"
          >
            <TelegramIcon className="w-4 h-4 text-primary" />
            <span>{isAr ? 'انضم إلى @center_tafaqquh' : 'Join @center_tafaqquh'}</span>
          </a>
        </div>
      </main>

      <Footer lng={lng} />
    </div>
  );
}
