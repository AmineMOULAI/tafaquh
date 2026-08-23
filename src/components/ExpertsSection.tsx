'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/client';
import { useApp } from '@/context/AppContext';
import { StarGeometricIcon, MailIcon, BookIcon } from './jalsa/Icons';
import { TafaqquhEmblem, IslamicWatermark } from './Motifs';

export default function ExpertsSection({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const { theme } = useApp();
  const isAr = lng === 'ar';

  return (
    <section id="experts" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`relative rounded-[36px] p-8 md:p-14 border-2 border-gold/50 shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden ${
            theme === 'light'
              ? 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3ECE0] text-[#123326]'
              : 'bg-gradient-to-br from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#061A12] text-white'
          }`}
        >
          {/* Subtle Islamic Watermark */}
          <IslamicWatermark className="opacity-[0.04]" />

          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/60 pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/60 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/60 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            {/* Logo Emblem with Golden Circle & Open Book */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex-shrink-0"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-gold/30 via-gold/10 to-transparent p-2 border-2 border-gold/50 flex items-center justify-center shadow-xl">
                <TafaqquhEmblem className="w-24 h-24 md:w-32 md:h-32" />
              </div>
            </motion.div>

            {/* Content Info */}
            <div className="space-y-4 text-center md:text-right flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest">
                <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
                <span>{t('experts.badge')}</span>
              </div>

              <h3
                className={`text-2xl md:text-4xl font-bold tracking-tight text-gold ${
                  isAr ? 'font-calligraphy' : 'font-display'
                }`}
              >
                {t('experts.title')}
              </h3>

              <p className="font-amiri text-lg md:text-xl font-bold leading-relaxed text-emerald-800 dark:text-emerald-200">
                «{t('experts.invitation')}»
              </p>

              <p
                className={`text-sm md:text-base leading-relaxed font-amiri ${
                  theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/75'
                }`}
              >
                {t('experts.description')}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={`/${lng}#contact`}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-2"
                >
                  <MailIcon className="w-4 h-4" />
                  <span>{t('experts.cta')}</span>
                </a>

                <a
                  href={`/${lng}#axes`}
                  className={`px-6 py-3.5 rounded-2xl border text-sm font-bold transition-all flex items-center gap-2 ${
                    theme === 'light'
                      ? 'border-gold/40 text-[#123326] hover:bg-gold/10'
                      : 'border-gold/30 text-gold hover:bg-gold/15'
                  }`}
                >
                  <BookIcon className="w-4 h-4" />
                  <span>{t('menu.axes')}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
