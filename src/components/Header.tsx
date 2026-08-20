'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import SettingsModal from './SettingsModal';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { useApp } from '@/context/AppContext';
import { StarGeometricIcon, MicrophoneIcon, CompassIcon } from './jalsa/Icons';

export default function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const { theme, toggleTheme, navLayout, setIsSettingsOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['about', 'axes', 'contact'];
  const isAr = lng === 'ar';

  // If user selected sidebar mode on desktop, the header remains accessible or can be compact
  const isSidebarMode = navLayout === 'sidebar';

  return (
    <>
      <SettingsModal lng={lng} />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center p-3 md:p-6 transition-all ${
          isSidebarMode ? (isAr ? 'lg:mr-24' : 'lg:ml-24') : ''
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            animate={{
              backgroundColor:
                theme === 'light'
                  ? isScrolled
                    ? "rgba(253, 251, 247, 0.98)"
                    : "rgba(250, 248, 245, 0.94)"
                  : isScrolled
                  ? "rgba(10, 20, 15, 0.98)"
                  : "rgba(15, 30, 25, 0.94)",
              paddingTop: isScrolled ? "6px" : "10px",
              paddingBottom: isScrolled ? "6px" : "10px",
              borderColor: "rgba(212, 175, 55, 0.6)",
            }}
            style={{
              clipPath:
                'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
            }}
            className={`backdrop-blur-3xl px-6 md:px-10 flex justify-between items-center border border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10 group transition-all duration-500 ${
              theme === 'light' ? 'text-[#123326]' : 'text-white'
            }`}
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 pointer-events-none" />

            {/* Islamic Geometric Background Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%23D4AF37' fill-opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px',
              }}
            />

            {/* Brand Logo & Title */}
            <Link href={`/${lng}`} className="flex items-center gap-3 md:gap-5 group/logo relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center p-2"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-gold via-gold-light to-amber-500 shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  }}
                />
                <Image
                  src="/images/tafaqquh-logo.png"
                  alt="TAFAQQUH Logo"
                  width={80}
                  height={80}
                  className="object-contain relative z-10 drop-shadow-md"
                />
              </motion.div>

              <div className="flex flex-col">
                <span
                  className={`font-bold text-gold tracking-tight leading-none ${
                    isAr ? 'text-2xl md:text-3xl font-calligraphy' : 'text-lg md:text-xl font-display uppercase tracking-widest'
                  }`}
                >
                  {t('project_name')}
                </span>
                <span className="text-[8px] md:text-[9px] text-gold/70 font-mono uppercase tracking-[0.25em] mt-1 hidden sm:block">
                  {t('slogan_short')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links & Islamic App Pills */}
            <nav className="hidden lg:flex items-center gap-6 relative z-10">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={`/${lng}#${item}`}
                  className={`relative font-bold text-base md:text-lg font-display hover:text-gold transition-colors py-1 group/nav ${
                    theme === 'light' ? 'text-[#123326]' : 'text-white/90'
                  }`}
                >
                  {t(`menu.${item}`)}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                  />
                </Link>
              ))}

              {/* Jalsa / Majalis Islamic Pill Button */}
              <Link
                href={`/${lng}/jalsa`}
                className="relative text-gold font-bold text-sm md:text-base font-calligraphy hover:text-white transition-all py-1.5 px-4 border border-gold/50 rounded-xl bg-gradient-to-r from-gold/15 to-[#0B3B2C]/80 hover:bg-gold/25 flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.25)] group/jalsa"
              >
                <MicrophoneIcon className="w-4 h-4 text-gold group-hover/jalsa:scale-110 transition-transform" />
                <span>{isAr ? 'المجالس (جَلْسَة)' : 'Majalis (Jalsa)'}</span>
              </Link>

              {/* Izkur App Islamic Pill Button */}
              <Link
                href={`/${lng}/izkur`}
                className="relative text-gold font-bold text-sm md:text-base font-calligraphy hover:text-white transition-all py-1.5 px-4 border border-gold/50 rounded-xl bg-gradient-to-r from-gold/15 to-[#0B3B2C]/80 hover:bg-gold/25 flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.25)] group/izkur"
              >
                <StarGeometricIcon className="w-4 h-4 text-gold group-hover/izkur:rotate-45 transition-transform duration-300" />
                <span>{isAr ? 'اذْكُرْ' : 'Izkur'}</span>
              </Link>
            </nav>

            {/* Right Controls: Theme Toggle + Settings + Language + Mobile Menu */}
            <div className="flex items-center gap-2.5 relative z-10">
              {/* Quick Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="p-2 rounded-xl bg-gold/10 hover:bg-gold/25 border border-gold/40 text-gold transition-all flex items-center justify-center text-sm"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Settings Modal Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                title={isAr ? 'الإعدادات والتخصيص' : 'Settings'}
                className="p-2 rounded-xl bg-gold/10 hover:bg-gold/25 border border-gold/40 text-gold transition-all flex items-center justify-center"
              >
                <CompassIcon className="w-4 h-4" />
              </button>

              <div className="h-6 w-px bg-gold/30 hidden sm:block" />
              <LanguageSelector lng={lng} />

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gold/10 border border-gold/30 text-gold hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Corner Pillar Styling */}
            <div className="absolute top-0 right-0 w-6 h-full opacity-40 pointer-events-none flex flex-col justify-between p-1">
              <div className="w-full h-6 border-t-2 border-r-2 border-gold" />
              <div className="w-full h-6 border-b-2 border-r-2 border-gold" />
            </div>
            <div className="absolute top-0 left-0 w-6 h-full opacity-40 pointer-events-none flex flex-col justify-between p-1">
              <div className="w-full h-6 border-t-2 border-l-2 border-gold" />
              <div className="w-full h-6 border-b-2 border-l-2 border-gold" />
            </div>
          </motion.div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`lg:hidden mt-2 p-6 rounded-3xl border-2 border-gold/50 backdrop-blur-2xl shadow-2xl space-y-4 text-center ${
                  theme === 'light' ? 'bg-[#FAF8F5]/98 text-[#123326]' : 'bg-[#0B3B2C]/98 text-white'
                }`}
              >
                <div className="flex flex-col gap-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item}
                      href={`/${lng}#${item}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-bold text-lg font-display hover:text-gold transition-colors py-2 border-b border-gold/20 ${
                        theme === 'light' ? 'text-[#123326]' : 'text-white'
                      }`}
                    >
                      {t(`menu.${item}`)}
                    </Link>
                  ))}

                  <Link
                    href={`/${lng}/jalsa`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl bg-gold/20 text-gold font-bold text-lg font-calligraphy border border-gold/40 flex items-center justify-center gap-2"
                  >
                    <MicrophoneIcon className="w-5 h-5 text-gold" />
                    <span>{isAr ? 'المجالس (جَلْسَة)' : 'Majalis (Jalsa)'}</span>
                  </Link>

                  <Link
                    href={`/${lng}/izkur`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-xl bg-gold/20 text-gold font-bold text-lg font-calligraphy border border-gold/40 flex items-center justify-center gap-2"
                  >
                    <StarGeometricIcon className="w-5 h-5 text-gold" />
                    <span>{isAr ? 'اذْكُرْ' : 'Izkur'}</span>
                  </Link>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={toggleTheme}
                      className="px-4 py-2 rounded-xl bg-gold/15 text-gold font-bold text-sm border border-gold/30 flex items-center gap-2"
                    >
                      <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                      <span>{theme === 'dark' ? (isAr ? 'الوضع الفاتح' : 'Light Theme') : (isAr ? 'الوضع الداكن' : 'Dark Theme')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsSettingsOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gold/15 text-gold font-bold text-sm border border-gold/30 flex items-center gap-1.5"
                    >
                      <CompassIcon className="w-4 h-4" />
                      <span>{isAr ? 'الإعدادات' : 'Settings'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
