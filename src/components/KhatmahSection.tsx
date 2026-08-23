'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/client';
import { useApp } from '@/context/AppContext';
import {
  StarGeometricIcon,
  BookIcon,
  CheckmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from './jalsa/Icons';
import { IslamicWatermark } from './Motifs';

export default function KhatmahSection({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const { theme } = useApp();
  const isAr = lng === 'ar';

  return (
    <section id="khatmah" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-8 md:p-14 rounded-[36px] border-2 border-gold/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 ${
            theme === 'light'
              ? 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3ECE0] text-[#123326]'
              : 'bg-gradient-to-br from-[#0B3B2C]/90 via-[#0A261A]/95 to-[#0A0D0B] text-white'
          }`}
        >
          <IslamicWatermark className="opacity-[0.04]" />

          {/* Left Text Column */}
          <div className="space-y-6 flex-1 text-center lg:text-right relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest">
              <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
              <span>{t('khatmah.badge')}</span>
            </div>

            <h2
              className={`text-3xl md:text-5xl font-bold tracking-tight text-gold ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {t('khatmah.title')}
            </h2>

            <p className="font-amiri text-lg md:text-xl text-gold-muted font-bold">
              {t('khatmah.subtitle')}
            </p>

            <p
              className={`text-base font-amiri leading-relaxed max-w-xl ${
                theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
              }`}
            >
              {t('khatmah.description')}
            </p>

            {/* Quick Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-right">
              {[
                t('khatmah.feature_1_title'),
                t('khatmah.feature_2_title'),
                t('khatmah.feature_3_title'),
                t('khatmah.feature_4_title'),
              ].map((fTitle, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-amiri font-bold text-gold">
                  <CheckmarkIcon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{fTitle}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="https://hifd-coran.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <BookIcon className="w-4 h-4 text-primary" />
                <span>{t('khatmah.open_web_app')}</span>
                <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full font-mono font-bold">↗</span>
              </a>

              <Link
                href={`/${lng}/khatmah`}
                className={`px-6 py-3.5 rounded-2xl border text-sm font-bold transition-all flex items-center gap-2 ${
                  theme === 'light'
                    ? 'border-gold/50 text-[#123326] hover:bg-gold/10'
                    : 'border-gold/40 text-gold hover:bg-gold/15'
                }`}
              >
                <span>{isAr ? 'تفاصيل التطبيق والميزات' : 'App Features'}</span>
                {isAr ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
              </Link>
            </div>
          </div>

          {/* Right Phone Mockup Card */}
          <div className="w-full max-w-xs relative z-10 flex-shrink-0">
            <div className="p-4 rounded-3xl bg-[#071911] border-2 border-gold/40 shadow-2xl text-white font-amiri space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gold/20">
                <span className="text-xs text-gold font-bold font-calligraphy">خَتْمَة • الورد اليومي</span>
                <span className="text-[10px] text-emerald-400 font-mono">الجزء 15</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-gold/30 text-center">
                <span className="text-[10px] text-gold/80">نسبة الإنجاز</span>
                <div className="text-2xl font-bold font-mono text-gold">68%</div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-gold/30 mt-1">
                  <div className="w-[68%] h-full bg-gold rounded-full" />
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-gold/15 border border-gold/30 text-center text-xs text-gold font-bold">
                ✨ خطة المراجعة: سورة الكهف
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
