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
} from './jalsa/Icons';

interface SidebarProps {
  lng: string;
}

export default function Sidebar({ lng }: SidebarProps) {
  const { theme, toggleTheme, navLayout, isSidebarCollapsed, toggleSidebar, setIsSettingsOpen } = useApp();
  const { t } = useTranslation(lng);

  if (navLayout !== 'sidebar') return null;

  const isAr = lng === 'ar';
  const menuItems = ['about', 'axes', 'contact'];

  return (
    <aside
      className={`fixed top-0 bottom-0 z-50 flex flex-col justify-between p-4 transition-all duration-300 ${
        isAr ? 'right-0 border-l' : 'left-0 border-r'
      } ${
        isSidebarCollapsed ? 'w-20' : 'w-72'
      } ${
        theme === 'light'
          ? 'bg-[#FDFBF7]/95 text-[#123326] border-gold/40 shadow-2xl backdrop-blur-2xl'
          : 'bg-[#0A1A14]/95 text-white border-gold/40 shadow-2xl backdrop-blur-2xl'
      }`}
    >
      {/* Background Decorative Islamic Tile */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4 16 16 4-16 4-4 16-4-16-16-4 16-4z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Top Section: Logo & Toggle */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link href={`/${lng}`} className="flex items-center gap-3 group">
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
                <span className={`font-bold text-gold text-xl leading-none ${isAr ? 'font-calligraphy' : 'font-display tracking-wider'}`}>
                  {t('project_name')}
                </span>
                <span className="text-[9px] text-gold/70 font-mono tracking-widest mt-0.5">
                  {t('slogan_short')}
                </span>
              </div>
            )}
          </Link>

          {/* Collapse/Expand button */}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 rounded-xl bg-gold/10 hover:bg-gold hover:text-primary text-gold border border-gold/30 flex items-center justify-center transition-all"
            title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            <span className="text-xs font-bold">{isSidebarCollapsed ? (isAr ? '◀' : '▶') : (isAr ? '▶' : '◀')}</span>
          </button>
        </div>

        {/* Apps Navigation Links */}
        <div className="space-y-2">
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block px-2">
              {isAr ? 'التطبيقات والمدارسة' : 'Apps & Circles'}
            </span>
          )}

          {/* Jalsa / Majalis */}
          <Link
            href={`/${lng}/jalsa`}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all border ${
              theme === 'light'
                ? 'bg-white/80 hover:bg-gold/20 text-[#123326] border-gold/30'
                : 'bg-gradient-to-r from-gold/15 to-[#0B3B2C]/60 hover:bg-gold/25 text-white border-gold/40 shadow-sm'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
              <MicrophoneIcon className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-right flex-1">
                <span className="text-sm font-bold font-calligraphy text-gold">
                  {isAr ? 'المجالس (جَلْسَة)' : 'Majalis (Jalsa)'}
                </span>
                <span className="text-[10px] text-emerald-300/80 font-amiri">
                  {isAr ? 'تسجيلات وشروحات' : 'Audio Sessions & Notes'}
                </span>
              </div>
            )}
          </Link>

          {/* Izkur App */}
          <Link
            href={`/${lng}/izkur`}
            className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all border ${
              theme === 'light'
                ? 'bg-white/80 hover:bg-gold/20 text-[#123326] border-gold/30'
                : 'bg-gradient-to-r from-gold/15 to-[#0B3B2C]/60 hover:bg-gold/25 text-white border-gold/40 shadow-sm'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold flex items-center justify-center flex-shrink-0">
              <StarGeometricIcon className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-right flex-1">
                <span className="text-sm font-bold font-calligraphy text-gold">
                  {isAr ? 'اذْكُرْ' : 'Izkur'}
                </span>
                <span className="text-[10px] text-emerald-300/80 font-amiri">
                  {isAr ? 'العداد الصوتي الرقمي' : 'Voice Dhikr Counter'}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Main Section Links */}
        <nav className="space-y-1">
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block px-2 pt-2">
              {isAr ? 'أقسام المنصة' : 'Sections'}
            </span>
          )}

          {menuItems.map((item) => (
            <Link
              key={item}
              href={`/${lng}#${item}`}
              className={`p-2.5 rounded-xl flex items-center gap-3 transition-all ${
                theme === 'light'
                  ? 'hover:bg-gold/15 text-[#123326] font-bold'
                  : 'hover:bg-white/10 text-white/90 font-bold'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-gold/40" />
              {!isSidebarCollapsed && (
                <span className="text-sm font-display">{t(`menu.${item}`)}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Controls: Theme Toggle, Settings, Language */}
      <div className="pt-4 border-t border-gold/20 space-y-3 relative z-10">
        {/* Quick Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full p-2.5 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold flex items-center justify-between text-xs font-bold transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">{theme === 'dark' ? '🌙' : '☀️'}</span>
            {!isSidebarCollapsed && (
              <span>{theme === 'dark' ? (isAr ? 'الوضع الداكن' : 'Dark Mode') : (isAr ? 'الوضع الفاتح' : 'Light Mode')}</span>
            )}
          </div>
          {!isSidebarCollapsed && (
            <span className="text-[10px] font-mono text-gold/60">
              {isAr ? 'تبديل' : 'Switch'}
            </span>
          )}
        </button>

        {/* Settings Modal Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-gold/30 text-gold flex items-center justify-center gap-2 text-xs font-bold transition-all"
        >
          <CompassIcon className="w-4 h-4 text-gold" />
          {!isSidebarCollapsed && <span>{isAr ? 'إعدادات المنصة' : 'Settings'}</span>}
        </button>

        {/* Language Selector */}
        {!isSidebarCollapsed && (
          <div className="flex justify-center pt-1">
            <LanguageSelector lng={lng} />
          </div>
        )}
      </div>
    </aside>
  );
}
