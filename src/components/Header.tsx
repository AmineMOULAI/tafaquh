'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import SettingsModal from './SettingsModal';
import { useTranslation } from '@/i18n/client';
import { useApp } from '@/context/AppContext';
import {
  StarGeometricIcon,
  MicrophoneIcon,
  CompassIcon,
  SunIcon,
  MoonIcon,
  SettingsIcon,
  MenuIcon,
  CrossIcon,
} from './jalsa/Icons';

export default function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const { theme, toggleTheme, navLayout, setIsSettingsOpen, setIsMobileSidebarOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAr = lng === 'ar';

  // If user selected sidebar mode on desktop
  if (navLayout === 'sidebar') {
    return (
      <>
        <SettingsModal lng={lng} />

        {/* Mobile floating top bar trigger only */}
        <div className="lg:hidden fixed top-3 right-3 left-3 z-40 flex items-center justify-between pointer-events-none font-subtitle">
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className={`p-3 rounded-2xl border-2 border-gold/40 shadow-xl backdrop-blur-2xl flex items-center gap-2 text-gold transition-all active:scale-95 ${
                theme === 'light' ? 'bg-[#FAF8F5]/95 text-[#123326]' : 'bg-[#04120D]/95 text-white'
              }`}
            >
              <MenuIcon className="w-5 h-5 text-gold" />
              <span className="text-xs font-bold font-title">{t('project_name')}</span>
            </button>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl border border-gold/40 text-gold shadow-md backdrop-blur-2xl ${
                theme === 'light' ? 'bg-white/90' : 'bg-black/60'
              }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2.5 rounded-2xl border border-gold/40 text-gold shadow-md backdrop-blur-2xl ${
                theme === 'light' ? 'bg-white/90' : 'bg-black/60'
              }`}
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </>
    );
  }

  // Modern Architectural Floating Top Navbar
  return (
    <>
      <SettingsModal lng={lng} />

      <header className="fixed top-0 left-0 right-0 z-40 px-3 md:px-6 pt-3 md:pt-4 pointer-events-none font-subtitle">
        <div className="container mx-auto max-w-7xl pointer-events-auto">
          <nav
            className={`relative rounded-[28px] border-2 transition-all duration-300 shadow-2xl backdrop-blur-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 md:gap-4 ${
              theme === 'light'
                ? isScrolled
                  ? 'bg-[#FFFDF9]/95 border-gold/50 text-[#123326] shadow-gold/15'
                  : 'bg-[#FAF8F5]/90 border-gold/35 text-[#123326] shadow-gold/10'
                : isScrolled
                ? 'bg-[#04120D]/95 border-gold/40 text-white shadow-black/80'
                : 'bg-[#061812]/90 border-gold/30 text-white shadow-black/50'
            }`}
          >
            {/* Top Golden Hairline */}
            <div className="absolute top-0 left-12 right-12 h-[1.5px] bg-gradient-to-r from-transparent via-gold/60 to-transparent pointer-events-none" />

            {/* Right: Brand Logo & Title */}
            <div className="flex items-center gap-3 lg:gap-5">
              <Link
                href={`/${lng}`}
                className="flex items-center gap-3 group/logo"
                title="تَفَقَّهْ — منصة التأصيل والوعي الإسلامي"
              >
                {/* White Medallion for Highest Logo Clarity */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center p-1 flex-shrink-0 group-hover/logo:scale-105 transition-transform overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/logo-tafaquh.png"
                      alt="شعار تَفَقَّه"
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col text-right">
                  <span
                    className={`font-bold text-gold leading-none ${
                      isAr ? 'text-2xl font-calligraphy' : 'text-lg font-title uppercase tracking-widest'
                    }`}
                  >
                    {t('project_name')}
                  </span>
                  <span className="text-[9px] text-gold/70 font-mono tracking-widest mt-0.5 hidden sm:block">
                    {isAr ? 'التأصيل • التجديد • الأثر' : 'Authenticity • Renewal'}
                  </span>
                </div>
              </Link>

              {/* Desktop Core Navigation Links */}
              <div className="hidden xl:flex items-center gap-1 text-xs font-bold">
                <Link
                  href={`/${lng}`}
                  className="px-3 py-1.5 rounded-xl hover:bg-gold/15 text-gold transition-colors"
                >
                  {t('menu.home')}
                </Link>
                <Link
                  href={`/${lng}#axes`}
                  className="px-3 py-1.5 rounded-xl hover:bg-gold/15 text-gray-300 hover:text-gold transition-colors"
                >
                  {t('menu.axes')}
                </Link>
                <Link
                  href={`/${lng}#about`}
                  className="px-3 py-1.5 rounded-xl hover:bg-gold/15 text-gray-300 hover:text-gold transition-colors"
                >
                  {t('menu.about')}
                </Link>
                <Link
                  href={`/${lng}#experts`}
                  className="px-3 py-1.5 rounded-xl hover:bg-gold/15 text-gray-300 hover:text-gold transition-colors"
                >
                  {t('menu.experts')}
                </Link>
              </div>
            </div>

            {/* Center: Ecosystem Apps & Jalsa Pill Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Jalsa Sessions Button */}
              <Link
                href={`/${lng}/jalsa`}
                className="px-3.5 py-1.5 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 group"
                title="حلقات المدارسة والتسجيلات الصوتية"
              >
                <MicrophoneIcon className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                <span>{isAr ? 'جلسات تفقه' : 'Jalsa'}</span>
              </Link>

              {/* Mawiza Platform External Pill */}
              <a
                href="https://mawiza.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold/20 via-gold/15 to-amber-500/20 hover:bg-gold hover:text-primary text-gold border border-gold/50 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-105"
                title="منصة مَوْعِظَة للتدبر القرآني والمصحف الشريف"
              >
                <CompassIcon className="w-3.5 h-3.5" />
                <span>{isAr ? 'منصة مَوْعِظَة' : 'Maw’izah'}</span>
              </a>

              {/* Izkur Platform External Pill */}
              <a
                href="https://izkur.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105"
                title="العداد الصوتي الذكي للأذكار والتسبيح"
              >
                <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
                <span>{isAr ? 'اذْكُرْ' : 'Izkur'}</span>
              </a>

              {/* Khatmah App Pill */}
              <Link
                href={`/${lng}/khatmah`}
                className="px-3 py-1.5 rounded-xl bg-black/30 hover:bg-gold/20 text-gray-300 hover:text-gold border border-gold/25 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <StarGeometricIcon className="w-3 h-3 text-gold/70" />
                <span>{isAr ? 'ختمة' : 'Khatmah'}</span>
              </Link>
            </div>

            {/* Left: Quick Actions, Theme, Settings, Language, Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 transition-all flex items-center justify-center"
                title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              >
                {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
              </button>

              {/* Settings Modal Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-xl bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 transition-all flex items-center justify-center"
                title="الإعدادات والتخصيص"
              >
                <SettingsIcon className="w-4 h-4" />
              </button>

              {/* Language Selector */}
              <div className="h-5 w-px bg-gold/20 hidden sm:block" />
              <LanguageSelector lng={lng} />

              {/* Mobile Drawer Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gold/15 border border-gold/40 text-gold"
                title="القائمة الرئيسية"
              >
                {mobileMenuOpen ? <CrossIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Full-Featured Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md lg:hidden font-subtitle pointer-events-auto">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className={`w-full max-w-sm h-full flex flex-col justify-between p-6 border-r-2 border-gold/40 shadow-2xl overflow-y-auto ${
                  theme === 'light' ? 'bg-[#FAF8F5] text-[#123326]' : 'bg-[#061812] text-white'
                }`}
              >
                <div className="space-y-6">
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gold/30">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl bg-white border border-gold p-1 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/images/logo-tafaquh.png"
                          alt="Logo"
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                      <span className="font-title text-xl font-bold text-gold leading-none">
                        {t('project_name')}
                      </span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-gold p-1">
                      <CrossIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Ecosystem Platforms Section */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-gold/70 block uppercase tracking-widest">
                      {isAr ? 'المنصات والتطبيقات' : 'Platforms & Apps'}
                    </span>

                    <Link
                      href={`/${lng}/jalsa`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-gold/15 text-gold border border-gold/30 font-bold text-sm flex items-center gap-2.5"
                    >
                      <MicrophoneIcon className="w-4 h-4 text-gold" />
                      <span>{isAr ? 'جلسات تفقه العلمية' : 'Jalsa Sessions'}</span>
                    </Link>

                    <a
                      href="https://mawiza.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-gradient-to-r from-gold/20 to-amber-500/20 text-gold border border-gold/40 font-bold text-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <CompassIcon className="w-4 h-4 text-gold" />
                        <span>{isAr ? 'منصة مَوْعِظَة للقرآن' : 'Maw’izah Platform'}</span>
                      </div>
                      <span className="text-xs text-gold">↗</span>
                    </a>

                    <a
                      href="https://izkur.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/30 font-bold text-sm flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <StarGeometricIcon className="w-4 h-4 text-gold" />
                        <span>{isAr ? 'تطبيق اذْكُرْ الصوتي' : 'Izkur App'}</span>
                      </div>
                      <span className="text-xs text-gold">↗</span>
                    </a>

                    <Link
                      href={`/${lng}/khatmah`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-black/20 text-gray-200 border border-gold/20 font-bold text-sm flex items-center gap-2.5"
                    >
                      <StarGeometricIcon className="w-4 h-4 text-gold/60" />
                      <span>{isAr ? 'تطبيق خَتْمَة القرآنية' : 'Khatmah Tracker'}</span>
                    </Link>
                  </div>

                  {/* Core Navigation Links */}
                  <div className="space-y-1.5 pt-2 border-t border-gold/20">
                    <span className="text-[11px] font-mono text-gold/70 block uppercase tracking-widest mb-1">
                      {isAr ? 'أقسام الموقع' : 'Navigation'}
                    </span>
                    <Link
                      href={`/${lng}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-gold/10 text-gray-200 hover:text-gold text-sm font-bold block"
                    >
                      {t('menu.home')}
                    </Link>
                    <Link
                      href={`/${lng}#axes`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-gold/10 text-gray-200 hover:text-gold text-sm font-bold block"
                    >
                      {t('menu.axes')}
                    </Link>
                    <Link
                      href={`/${lng}#about`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-gold/10 text-gray-200 hover:text-gold text-sm font-bold block"
                    >
                      {t('menu.about')}
                    </Link>
                    <Link
                      href={`/${lng}#experts`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-gold/10 text-gray-200 hover:text-gold text-sm font-bold block"
                    >
                      {t('menu.experts')}
                    </Link>
                    <Link
                      href={`/${lng}#contact`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-gold/10 text-gray-200 hover:text-gold text-sm font-bold block"
                    >
                      {t('menu.contact')}
                    </Link>
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-gold/60">
                  <span>© {new Date().getFullYear()} تَفَقَّهْ</span>
                  <span className="font-mono">{lng.toUpperCase()}</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
