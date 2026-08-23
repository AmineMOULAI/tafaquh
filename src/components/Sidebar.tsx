'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/i18n/client';
import LanguageSelector from './LanguageSelector';
import {
  StarGeometricIcon,
  MicrophoneIcon,
  BookIcon,
  CompassIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
  SunIcon,
  MoonIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CrossIcon,
} from './jalsa/Icons';

interface SidebarProps {
  lng: string;
}

export default function Sidebar({ lng }: SidebarProps) {
  const {
    theme,
    toggleTheme,
    navLayout,
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setIsSettingsOpen,
  } = useApp();
  const { t } = useTranslation(lng);

  if (navLayout !== 'sidebar') return null;

  const isAr = lng === 'ar';

  const navItems = [
    { key: 'home', href: `/${lng}`, label: isAr ? 'الرئيسية' : 'Home', icon: HomeIcon },
    { key: 'about', href: `/${lng}#about`, label: t('menu.about'), icon: BookIcon },
    { key: 'axes', href: `/${lng}#axes`, label: t('menu.axes'), icon: LayersIcon },
    { key: 'contact', href: `/${lng}#contact`, label: t('menu.contact'), icon: MailIcon },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 overflow-y-auto relative z-10">
      {/* Top Header: Logo & Collapse Toggle */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gold/30">
          <Link
            href={`/${lng}`}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center p-1.5 flex-shrink-0">
              <div
                className="absolute inset-0 bg-gradient-to-br from-gold via-gold-light to-amber-500 shadow-md"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}
              />
              <Image
                src="/images/tafaqquh-logo.png"
                alt="TAFAQQUH"
                width={40}
                height={40}
                className="object-contain relative z-10"
              />
            </div>

            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className={`font-bold text-gold text-2xl leading-none ${isAr ? 'font-calligraphy' : 'font-display tracking-wider'}`}>
                  {t('project_name')}
                </span>
                <span className="text-[9px] text-gold/80 font-mono tracking-widest mt-1">
                  {t('slogan_short')}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-8 h-8 rounded-xl bg-gold/10 hover:bg-gold hover:text-primary text-gold border border-gold/30 items-center justify-center transition-all flex-shrink-0"
            title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            {isSidebarCollapsed ? (
              isAr ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />
            ) : (
              isAr ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-xl bg-white/10 text-gold flex items-center justify-center"
          >
            <CrossIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Islamic Apps Section */}
        <div className="space-y-2">
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-gold/70 uppercase tracking-widest block px-2 font-bold">
              {isAr ? 'البرامج والتطبيقات' : 'Apps & Circles'}
            </span>
          )}

          {/* Majalis (Jalsa) */}
          <Link
            href={`/${lng}/jalsa`}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all border group ${
              theme === 'light'
                ? 'bg-white/90 hover:bg-gold/15 text-[#123326] border-gold/40 shadow-sm'
                : 'bg-gradient-to-r from-gold/15 to-[#0B3B2C]/70 hover:bg-gold/25 text-white border-gold/40 shadow-md'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MicrophoneIcon className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-right flex-1">
                <span className="text-sm font-bold font-calligraphy text-gold">
                  {isAr ? 'المجالس (جَلْسَة)' : 'Majalis (Jalsa)'}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-amiri">
                  {isAr ? 'تسجيلات وشروحات صوتية' : 'Voice Study Sessions'}
                </span>
              </div>
            )}
          </Link>

          {/* Izkur Counter */}
          <Link
            href={`/${lng}/izkur`}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all border group ${
              theme === 'light'
                ? 'bg-white/90 hover:bg-gold/15 text-[#123326] border-gold/40 shadow-sm'
                : 'bg-gradient-to-r from-gold/15 to-[#0B3B2C]/70 hover:bg-gold/25 text-white border-gold/40 shadow-md'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 group-hover:rotate-45 transition-transform duration-300">
              <StarGeometricIcon className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-right flex-1">
                <span className="text-sm font-bold font-calligraphy text-gold">
                  {isAr ? 'اذْكُرْ (Izkur)' : 'Izkur'}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-amiri">
                  {isAr ? 'العداد الصوتي الرقمي' : 'Voice Dhikr Companion'}
                </span>
              </div>
            )}
          </Link>

          {/* Mawiza Platform */}
          <Link
            href={`/${lng}/mawiza`}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all border group ${
              theme === 'light'
                ? 'bg-white/90 hover:bg-gold/15 text-[#123326] border-gold/40 shadow-sm'
                : 'bg-gradient-to-r from-gold/15 to-[#0B3B2C]/70 hover:bg-gold/25 text-white border-gold/40 shadow-md'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <CompassIcon className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-right flex-1">
                <span className="text-sm font-bold font-calligraphy text-gold">
                  {isAr ? 'منصة موعظة' : 'Maw’izah Platform'}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-amiri">
                  {isAr ? 'تأملات قرآنية وفكرية' : 'Quranic Reflections'}
                </span>
              </div>
            )}
          </Link>

          {/* Khatmah App */}
          <Link
            href={`/${lng}/khatmah`}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all border group ${
              theme === 'light'
                ? 'bg-white/90 hover:bg-gold/15 text-[#123326] border-gold/40 shadow-sm'
                : 'bg-gradient-to-r from-gold/15 to-[#0B3B2C]/70 hover:bg-gold/25 text-white border-gold/40 shadow-md'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <BookIcon className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-right flex-1">
                <span className="text-sm font-bold font-calligraphy text-gold">
                  {isAr ? 'تطبيق خَتْمَة' : 'Khatmah App'}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-300 font-amiri">
                  {isAr ? 'تتبع الحفظ والمراجعة' : 'Hifz & Revision'}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-1.5 pt-2">
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-gold/70 uppercase tracking-widest block px-2 font-bold">
              {isAr ? 'أقسام المنصة' : 'Navigation'}
            </span>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`p-3 rounded-xl flex items-center gap-3 transition-all ${
                  theme === 'light'
                    ? 'hover:bg-gold/15 text-[#123326] font-bold'
                    : 'hover:bg-white/10 text-white/90 font-bold'
                }`}
              >
                <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <span className="text-sm font-display tracking-wide">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme Toggle, Settings, Language */}
      <div className="pt-4 border-t border-gold/20 space-y-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
            theme === 'light'
              ? 'bg-gold/10 hover:bg-gold/20 border-gold/40 text-[#123326]'
              : 'bg-gold/10 hover:bg-gold/20 border-gold/30 text-gold'
          }`}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
              {theme === 'dark' ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
            </div>
            {!isSidebarCollapsed && (
              <span>{theme === 'dark' ? (isAr ? 'الوضع الفاتح' : 'Light Theme') : (isAr ? 'الوضع الداكن' : 'Dark Theme')}</span>
            )}
          </div>
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-gold/70">
              {isAr ? 'تبديل' : 'Switch'}
            </span>
          )}
        </button>

        {/* Settings Modal Button */}
        <button
          onClick={() => {
            setIsSettingsOpen(true);
            setIsMobileSidebarOpen(false);
          }}
          className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-gold/30 text-gold flex items-center justify-center gap-2 text-xs font-bold transition-all"
        >
          <SettingsIcon className="w-4 h-4 text-gold" />
          {!isSidebarCollapsed && <span>{isAr ? 'إعدادات المنصة' : 'Settings'}</span>}
        </button>

        {/* Language Selector */}
        {!isSidebarCollapsed && (
          <div className="flex justify-center pt-1">
            <LanguageSelector lng={lng} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        className={`hidden lg:flex fixed top-0 bottom-0 z-50 flex-col transition-all duration-300 ${
          isAr ? 'right-0 border-l' : 'left-0 border-r'
        } ${isSidebarCollapsed ? 'w-20' : 'w-72'} ${
          theme === 'light'
            ? 'bg-[#FDFBF7]/95 text-[#123326] border-gold/40 shadow-2xl backdrop-blur-2xl'
            : 'bg-[#0A1A14]/95 text-white border-gold/40 shadow-2xl backdrop-blur-2xl'
        }`}
      >
        {/* Background Islamic Geometric Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4 16 16 4-16 4-4 16-4-16-16-4 16-4z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px',
          }}
        />
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Sliding Drawer & Backdrop */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: isAr ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={`relative w-72 h-full shadow-2xl border-gold/40 z-10 ${
                isAr ? 'mr-auto border-l' : 'ml-auto border-r'
              } ${
                theme === 'light' ? 'bg-[#FAF8F5] text-[#123326]' : 'bg-[#0A1A14] text-white'
              }`}
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
