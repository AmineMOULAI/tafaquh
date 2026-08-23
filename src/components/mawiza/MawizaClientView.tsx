'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/i18n/client';
import { useApp } from '@/context/AppContext';
import {
  StarGeometricIcon,
  BookIcon,
  CompassIcon,
  LayersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/jalsa/Icons';
import { TafaqquhEmblem, IslamicWatermark } from '@/components/Motifs';

interface MawizaClientViewProps {
  lng: string;
}

export default function MawizaClientView({ lng }: MawizaClientViewProps) {
  const { t } = useTranslation(lng);
  const { theme, navLayout } = useApp();
  const isAr = lng === 'ar';
  const isSidebar = navLayout === 'sidebar';

  const features = [
    {
      icon: BookIcon,
      title: t('mawiza.feature_1_title'),
      desc: t('mawiza.feature_1_desc'),
      tag: isAr ? 'تدبر قرآني' : 'Quranic Reflection',
    },
    {
      icon: LayersIcon,
      title: t('mawiza.feature_2_title'),
      desc: t('mawiza.feature_2_desc'),
      tag: isAr ? 'فكر وتربية' : 'Thought & Ethics',
    },
    {
      icon: StarGeometricIcon,
      title: t('mawiza.feature_3_title'),
      desc: t('mawiza.feature_3_desc'),
      tag: isAr ? 'لطائف نبوية' : 'Prophetic Gems',
    },
    {
      icon: CompassIcon,
      title: t('mawiza.feature_4_title'),
      desc: t('mawiza.feature_4_desc'),
      tag: isAr ? 'مشاركة وتفاعل' : 'Community Space',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-gold selection:text-primary transition-all duration-300 ${
        theme === 'light' ? 'bg-[#FAF8F5] text-[#123326]' : 'bg-[#0A0D0B] text-[#FDFBF7]'
      } ${isSidebar ? (isAr ? 'lg:pr-72' : 'lg:pl-72') : ''}`}
    >
      <Header lng={lng} />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-5xl flex-1 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gold font-amiri pb-2 border-b border-gold/20 font-bold">
          <Link href={`/${lng}`} className="hover:text-gold-muted transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className={theme === 'light' ? 'text-[#123326] font-bold' : 'text-white font-bold'}>
            {t('mawiza.title')}
          </span>
        </nav>

        {/* Hero Section */}
        <section className="text-center space-y-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Emblem Logo */}
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gold/30 via-gold/10 to-transparent p-2 border-2 border-gold/50 shadow-2xl flex items-center justify-center">
              <TafaqquhEmblem className="w-20 h-20" />
            </div>

            {/* Independent Platform Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
              <span>{t('mawiza.badge')}</span>
            </div>

            <h1
              className={`text-4xl md:text-6xl font-bold tracking-tight text-gold mb-3 ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {t('mawiza.title')}
            </h1>

            <p className="font-amiri text-xl md:text-2xl text-gold-muted max-w-2xl mx-auto font-bold leading-relaxed">
              {t('mawiza.subtitle')}
            </p>

            <p
              className={`text-base md:text-lg max-w-3xl mx-auto font-amiri leading-loose mt-4 ${
                theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
              }`}
            >
              {t('mawiza.description')}
            </p>

            {/* Direct CTA Link to Mawiza */}
            <div className="pt-6 flex flex-col items-center gap-2">
              <a
                href="https://mawiza.tafaqquh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary font-bold text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-3 group"
              >
                <span>{t('mawiza.visit_btn')}</span>
                {isAr ? (
                  <ChevronLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                )}
              </a>
              <span className="text-xs text-gold/60 font-amiri">
                {t('mawiza.external_note')}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Quranic Calligraphy Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-8 md:p-12 rounded-[36px] border-2 border-gold/40 text-center relative overflow-hidden shadow-2xl ${
            theme === 'light'
              ? 'bg-gradient-to-r from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDB] text-primary'
              : 'bg-gradient-to-r from-[#0B3B2C]/80 via-[#0A261A]/90 to-[#061A12] text-white'
          }`}
        >
          <IslamicWatermark className="opacity-[0.05]" />
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-gold font-bold font-mono">
              {isAr ? 'منطلق المنصة ورؤيتها' : 'Core Inspiration'}
            </span>
            <p className="font-amiri text-2xl md:text-3xl font-bold leading-[2.2] text-gold drop-shadow-sm">
              ﴿أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا﴾
            </p>
            <p className="text-xs text-gold/70 font-amiri">
              [سورة محمد: 24]
            </p>
          </div>
        </motion.div>

        {/* Platform Features Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2
              className={`text-2xl md:text-4xl font-bold text-gold ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {t('mawiza.highlights_title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all group ${
                    theme === 'light'
                      ? 'bg-white/90 border-gold/40 text-[#123326] hover:border-gold hover:shadow-gold/10'
                      : 'bg-gradient-to-b from-[#0B3B2C]/60 to-[#0A261A]/70 border-gold/30 text-white hover:border-gold/60'
                  }`}
                >
                  <IslamicWatermark className="opacity-[0.03]" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-xl font-bold text-gold ${
                            isAr ? 'font-calligraphy' : 'font-display'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-gold/15 text-gold border border-gold/25 font-bold font-mono">
                          {item.tag}
                        </span>
                      </div>
                      <p
                        className={`text-base font-amiri leading-relaxed ${
                          theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bottom Callout Banner */}
        <section
          className={`rounded-[32px] p-8 md:p-12 border-2 border-gold/40 text-center relative overflow-hidden shadow-2xl ${
            theme === 'light'
              ? 'bg-[#FFFDF9] text-[#123326]'
              : 'bg-gradient-to-b from-[#0B3B2C]/90 to-[#0A0D0B] text-white'
          }`}
        >
          <IslamicWatermark className="opacity-[0.04]" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3
              className={`text-2xl md:text-3xl font-bold text-gold ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {isAr ? 'انضم إلى رحلة التدبر والتفكر' : 'Join the Contemplation Journey'}
            </h3>
            <p
              className={`text-sm md:text-base font-amiri leading-relaxed ${
                theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
              }`}
            >
              {isAr
                ? 'استمتع بمطالعة المقالات الأسبوعية والتأملات الحصرية التي تُنشر بانتظام عبر منصة موعظة.'
                : 'Explore weekly reflection pieces, articles, and exclusive insights published on Maw’izah.'}
            </p>
            <div className="pt-2">
              <a
                href="https://mawiza.tafaqquh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all shadow-lg"
              >
                <span>{t('mawiza.visit_btn')}</span>
                {isAr ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer lng={lng} />
    </div>
  );
}
