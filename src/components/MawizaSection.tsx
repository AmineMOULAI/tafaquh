'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/client';
import { useApp } from '@/context/AppContext';
import {
  StarGeometricIcon,
  BookIcon,
  LayersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from './jalsa/Icons';
import { TafaqquhEmblem, IslamicWatermark } from './Motifs';

export default function MawizaSection({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const { theme } = useApp();
  const isAr = lng === 'ar';

  return (
    <section id="mawiza" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest">
            <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
            <span>{t('mawiza.badge')}</span>
          </div>

          <h2
            className={`text-3xl md:text-5xl font-bold tracking-tight text-gold ${
              isAr ? 'font-calligraphy' : 'font-display'
            }`}
          >
            {t('mawiza.title')}
          </h2>

          <p className="font-amiri text-lg md:text-xl text-gold-muted font-bold">
            {t('mawiza.subtitle')}
          </p>

          <p
            className={`text-base font-amiri leading-relaxed ${
              theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
            }`}
          >
            {t('mawiza.description')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: t('mawiza.feature_1_title'),
              desc: t('mawiza.feature_1_desc'),
              icon: BookIcon,
            },
            {
              title: t('mawiza.feature_2_title'),
              desc: t('mawiza.feature_2_desc'),
              icon: LayersIcon,
            },
            {
              title: t('mawiza.feature_3_title'),
              desc: t('mawiza.feature_3_desc'),
              icon: StarGeometricIcon,
            },
            {
              title: t('mawiza.feature_4_title'),
              desc: t('mawiza.feature_4_desc'),
              icon: TafaqquhEmblem,
            },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden flex flex-col justify-between group transition-all ${
                  theme === 'light'
                    ? 'bg-white/90 border-gold/40 text-[#123326] hover:border-gold'
                    : 'bg-gradient-to-b from-[#0B3B2C]/70 to-[#0A261A]/80 border-gold/30 text-white hover:border-gold/60'
                }`}
              >
                <IslamicWatermark className="opacity-[0.03]" />
                <div className="space-y-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                    {typeof IconComponent === 'function' ? (
                      <IconComponent className="w-5 h-5" />
                    ) : null}
                  </div>
                  <h3
                    className={`text-lg font-bold text-gold ${
                      isAr ? 'font-calligraphy' : 'font-display'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm font-amiri leading-relaxed line-clamp-4 ${
                      theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="https://mawiza.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>{isAr ? 'الدخول إلى منصة مَوْعِظَة' : 'Open Maw’izah Platform'}</span>
            {isAr ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          </a>

          <a
            href="https://mawiza.vercel.app/quran"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3.5 rounded-2xl border text-sm font-bold transition-all flex items-center gap-2 ${
              theme === 'light'
                ? 'border-gold/50 text-[#123326] hover:bg-gold/10'
                : 'border-gold/40 text-gold hover:bg-gold/15'
            }`}
          >
            <span>{isAr ? 'تصفح المصحف الشريف والتفاسير ←' : 'Browse Mushaf & Tafsir ←'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
