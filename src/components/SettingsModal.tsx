'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/i18n/client';
import LanguageSelector from './LanguageSelector';
import {
  StarGeometricIcon,
  CrossIcon,
  SunIcon,
  MoonIcon,
  SidebarLayoutIcon,
  TopbarLayoutIcon,
  CheckmarkIcon,
  SettingsIcon,
} from './jalsa/Icons';

interface SettingsModalProps {
  lng: string;
}

export default function SettingsModal({ lng }: SettingsModalProps) {
  const { theme, setTheme, navLayout, setNavLayout, isSettingsOpen, setIsSettingsOpen } = useApp();
  const { t } = useTranslation(lng);

  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  if (!isSettingsOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSettingsOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`relative w-full max-w-lg p-6 md:p-8 rounded-[36px] border-2 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden z-10 ${
            theme === 'light'
              ? 'bg-[#FAF8F5] text-[#123326] border-gold/60'
              : 'bg-gradient-to-b from-[#0B3B2C] via-[#0A261A] to-[#0A0D0B] text-[#FDFBF7] border-gold/50'
          }`}
        >
          {/* Decorative Islamic Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
              <path d="M100 0 L100 50 L75 50 L75 25 L25 25 L25 0 Z" />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-inner">
                <SettingsIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-xl md:text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                  {isAr ? 'إعدادات وتخصيص المنصة' : isFr ? 'Paramètres & Affichage' : 'Platform Settings'}
                </h3>
                <span className="text-xs text-gold/80 font-mono">
                  {isAr ? 'تخصيص المظهر ونمط القائمة' : 'Customize Theme & Navigation Style'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary transition-all flex items-center justify-center text-gold"
            >
              <CrossIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Options */}
          <div className="space-y-6 py-6">
            {/* 1. Theme Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gold uppercase tracking-wider block font-mono">
                {isAr ? '1. مظهر الموقع (Theme Mode)' : isFr ? '1. Mode d\'affichage' : '1. Theme Mode'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Dark Emerald Mode */}
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-28 relative overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-[#0B3B2C] border-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-black/20 border-white/10 text-gray-400 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <MoonIcon className="w-4 h-4 text-gold" />
                      <span className="text-base font-bold font-calligraphy text-gold">
                        {isAr ? 'الوضع الداكن' : 'Dark Emerald'}
                      </span>
                    </div>
                    {theme === 'dark' && <CheckmarkIcon className="w-4 h-4 text-gold" />}
                  </div>
                  <span className="text-[11px] text-gray-300 font-amiri leading-tight">
                    {isAr ? 'أخضر زمردي داكن مع إشعاع الذهب' : 'Midnight Emerald & Gold Accent'}
                  </span>
                </button>

                {/* Light Mode */}
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-28 relative overflow-hidden ${
                    theme === 'light'
                      ? 'bg-[#FFFDF9] border-gold text-[#123326] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-white/10 border-white/10 text-gray-400 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <SunIcon className="w-4 h-4 text-gold" />
                      <span className="text-base font-bold font-calligraphy text-gold">
                        {isAr ? 'الوضع الفاتح' : 'Clean White'}
                      </span>
                    </div>
                    {theme === 'light' && <CheckmarkIcon className="w-4 h-4 text-gold" />}
                  </div>
                  <span className="text-[11px] text-gray-600 dark:text-gray-300 font-amiri leading-tight">
                    {isAr ? 'أبيض ناصع وورق مخطوطات نقي' : 'Pure Ivory Parchment & Forest Green'}
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Navigation Layout */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gold uppercase tracking-wider block font-mono">
                {isAr ? '2. نمط القائمة والتنقل (Navigation Layout)' : isFr ? '2. Disposition du Menu' : '2. Navigation Layout'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Top Bar Layout */}
                <button
                  onClick={() => setNavLayout('top')}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-28 ${
                    navLayout === 'top'
                      ? 'bg-gold/20 border-gold text-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <TopbarLayoutIcon className="w-4 h-4 text-gold" />
                      <span className="text-base font-bold font-calligraphy">
                        {isAr ? 'شريط علوي' : 'Top Navbar'}
                      </span>
                    </div>
                    {navLayout === 'top' && <CheckmarkIcon className="w-4 h-4 text-gold" />}
                  </div>
                  <span className="text-[11px] text-gray-300 font-amiri leading-tight">
                    {isAr ? 'الشريط العلوي المعتاد أعلى الموقع' : 'Classic horizontal header bar'}
                  </span>
                </button>

                {/* Sidebar Layout */}
                <button
                  onClick={() => setNavLayout('sidebar')}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-28 ${
                    navLayout === 'sidebar'
                      ? 'bg-gold/20 border-gold text-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <SidebarLayoutIcon className="w-4 h-4 text-gold" />
                      <span className="text-base font-bold font-calligraphy">
                        {isAr ? 'شريط جانبي' : 'Sidebar Only'}
                      </span>
                    </div>
                    {navLayout === 'sidebar' && <CheckmarkIcon className="w-4 h-4 text-gold" />}
                  </div>
                  <span className="text-[11px] text-gray-300 font-amiri leading-tight">
                    {isAr ? 'قائمة جانبية فقط دون الشريط العلوي' : 'Vertical side navigation exclusively'}
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Language Selector */}
            <div className="p-4 rounded-2xl bg-black/30 border border-gold/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gold block font-mono">
                  {isAr ? 'لغة المنصة (Language)' : 'Language'}
                </span>
                <span className="text-[11px] text-gray-300 font-amiri">
                  {isAr ? 'العربية • English • Français' : 'Select your preferred language'}
                </span>
              </div>
              <LanguageSelector lng={lng} />
            </div>
          </div>

          {/* Footer Done Button */}
          <div className="pt-4 border-t border-gold/30 flex justify-end">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all shadow-md flex items-center gap-2"
            >
              <CheckmarkIcon className="w-4 h-4" />
              <span>{isAr ? 'حفظ وإغلاق' : isFr ? 'Enregistrer' : 'Done'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
