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
  ClockIcon,
  CheckmarkIcon,
  LayersIcon,
  CompassIcon,
} from '@/components/jalsa/Icons';
import { TafaqquhEmblem, IslamicWatermark } from '@/components/Motifs';

interface KhatmahClientViewProps {
  lng: string;
}

export default function KhatmahClientView({ lng }: KhatmahClientViewProps) {
  const { t } = useTranslation(lng);
  const { theme, navLayout } = useApp();
  const isAr = lng === 'ar';
  const isSidebar = navLayout === 'sidebar';

  const features = [
    {
      icon: BookIcon,
      title: t('khatmah.feature_1_title'),
      desc: t('khatmah.feature_1_desc'),
      stat: '114 سورة',
    },
    {
      icon: ClockIcon,
      title: t('khatmah.feature_2_title'),
      desc: t('khatmah.feature_2_desc'),
      stat: 'تكرار ذكي',
    },
    {
      icon: LayersIcon,
      title: t('khatmah.feature_3_title'),
      desc: t('khatmah.feature_3_desc'),
      stat: 'رسوم تفاعلية',
    },
    {
      icon: CheckmarkIcon,
      title: t('khatmah.feature_4_title'),
      desc: t('khatmah.feature_4_desc'),
      stat: '100% دون إنترنت',
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
            {t('khatmah.title')}
          </span>
        </nav>

        {/* Hero Section with App Preview */}
        <section className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left / Main Text info */}
          <div className="space-y-6 flex-1 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest">
              <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
              <span>{t('khatmah.badge')}</span>
            </div>

            <h1
              className={`text-4xl md:text-6xl font-bold tracking-tight text-gold ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {t('khatmah.title')}
            </h1>

            <p className="font-amiri text-xl md:text-2xl text-gold-muted font-bold leading-relaxed">
              {t('khatmah.subtitle')}
            </p>

            <p
              className={`text-base md:text-lg font-amiri leading-loose ${
                theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
              }`}
            >
              {t('khatmah.description')}
            </p>

            {/* Primary Web App Launch CTA */}
            <div className="pt-2 flex flex-col items-center lg:items-start gap-2">
              <a
                href="https://hifd-coran.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-amber-500 text-primary font-bold text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center gap-3 group"
              >
                <BookIcon className="w-5 h-5 text-primary" />
                <span>{t('khatmah.open_web_app')}</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono font-bold">
                  Live Web App ↗
                </span>
              </a>
              <span className="text-xs text-gold/70 font-mono">
                https://hifd-coran.vercel.app/
              </span>
            </div>

            {/* Mobile Stores Section */}
            <div className="pt-4 space-y-3">
              <span className="text-xs text-gold/80 font-mono font-bold block">
                📱 {t('khatmah.coming_soon')}
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {/* Apple App Store */}
                <div
                  className="px-5 py-3 rounded-2xl bg-black/60 text-white border border-gold/30 flex items-center gap-3 opacity-80 cursor-default"
                >
                  <svg className="w-6 h-6 fill-current text-gold" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.63 1.34-.56.64-1.05 1.7-0.92 2.73 1.01.08 2.01-.47 2.63-1.22z" />
                  </svg>
                  <div className="text-right flex flex-col">
                    <span className="text-[9px] text-gray-400 font-mono">App Store</span>
                    <span className="text-[11px] font-bold font-mono text-gold/90">iOS App</span>
                  </div>
                </div>

                {/* Google Play Store */}
                <div
                  className="px-5 py-3 rounded-2xl bg-black/60 text-white border border-gold/30 flex items-center gap-3 opacity-80 cursor-default"
                >
                  <svg className="w-6 h-6 fill-current text-gold" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.43 2.43 0 0 1-.61-1.686V3.5a2.43 2.43 0 0 1 .609-1.686zm11.605 11.608l2.586-2.586a1.438 1.438 0 0 0 0-2.032L15.214 6.22 14.5 6.934l5.068 5.066-5.068 5.066.714.714zm-1.422-1.422L4.318 2.526a1.44 1.44 0 0 1 .843-.276 1.43 1.43 0 0 1 1.018.423l7.613 7.613zm0 2.844l-7.613 7.613a1.43 1.43 0 0 1-1.018.423 1.44 1.44 0 0 1-.843-.276l9.474-9.474.714.714z" />
                  </svg>
                  <div className="text-right flex flex-col">
                    <span className="text-[9px] text-gray-400 font-mono">Google Play</span>
                    <span className="text-[11px] font-bold font-mono text-gold/90">Android App</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right / Visual Interactive Smartphone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xs md:max-w-sm flex-shrink-0"
          >
            <div className="relative rounded-[44px] p-4 bg-gradient-to-b from-[#0B3B2C] via-[#062319] to-black border-4 border-gold shadow-[0_25px_60px_rgba(212,175,55,0.3)] overflow-hidden">
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-black rounded-full mx-auto mb-4 border border-gold/30" />

              {/* Mockup Screen Content */}
              <div className="p-4 space-y-4 rounded-3xl bg-[#0A1812] border border-gold/30 text-white font-amiri">
                {/* Header in Mockup */}
                <div className="flex items-center justify-between pb-2 border-b border-gold/20">
                  <span className="text-xs text-gold font-bold font-calligraphy">خَتْمَة • الورد اليومي</span>
                  <span className="text-[10px] font-mono text-emerald-400">الجزء 15</span>
                </div>

                {/* Progress Circle Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#0B3B2C] border border-gold/40 text-center space-y-1">
                  <span className="text-[11px] text-gold-muted font-bold">نسبة إنجاز الحفظ</span>
                  <div className="text-3xl font-bold font-mono text-gold">68%</div>
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-gold/30 mt-1">
                    <div className="w-[68%] h-full bg-gradient-to-r from-gold to-amber-400 rounded-full" />
                  </div>
                  <span className="text-[10px] text-emerald-200">20 جزء محفوظ ومثبت</span>
                </div>

                {/* Daily Revision Card */}
                <div className="p-3 rounded-xl bg-black/40 border border-gold/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gold">خطة المراجعة لليوم</span>
                    <span className="text-[10px] text-gray-400 font-mono">سورة الكهف</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-300">
                    <CheckmarkIcon className="w-3.5 h-3.5 text-gold" />
                    <span>تثبيت الصفحات: 293 إلى 304</span>
                  </div>
                </div>

                {/* Streak Badge */}
                <div className="p-2.5 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-between text-xs text-gold font-bold">
                  <span>🔥 أيام الالتزام المتتالية:</span>
                  <span className="font-mono text-sm text-white">42 يوم</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Showcase Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2
              className={`text-2xl md:text-4xl font-bold text-gold ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {t('khatmah.features_title')}
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
                          {item.stat}
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
      </main>

      <Footer lng={lng} />
    </div>
  );
}
