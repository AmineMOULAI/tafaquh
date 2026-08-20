'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/i18n/client';
import LanguageSelector from './LanguageSelector';
import { StarGeometricIcon, CrossIcon } from './jalsa/Icons';

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
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-lg p-6 md:p-8 rounded-[36px] border-2 border-gold/50 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-3xl overflow-hidden z-10 ${
            theme === 'light'
              ? 'bg-[#FAF8F5] text-[#123326] border-gold/60'
              : 'bg-gradient-to-b from-[#0B3B2C] via-[#0A261A] to-[#0A0D0B] text-[#FDFBF7]'
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
              <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                <StarGeometricIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-xl md:text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                  {isAr ? 'إعدادات المنصة' : isFr ? 'Paramètres' : 'Platform Settings'}
                </h3>
                <span className="text-xs text-gold/70 font-mono">
                  {isAr ? 'تخصيص المظهر وشريط التنقل' : 'Customize Appearance & Navigation'}
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
                {isAr ? '1. مظهر الموقع (Theme)' : isFr ? '1. Thème d\'affichage' : '1. Theme Mode'}
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
                    <span className="text-lg font-bold font-calligraphy text-gold">
                      {isAr ? 'الوضع الداكن' : 'Dark Theme'}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  <span className="text-[11px] text-gray-300 font-amiri">
                    {isAr ? 'أخضر زمردي إسلامي فاخر مع الذهب' : 'Luxury Dark Emerald & Gold'}
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
                    <span className="text-lg font-bold font-calligraphy text-gold">
                      {isAr ? 'الوضع الفاتح' : 'Light Theme'}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
                  </div>
                  <span className="text-[11px] text-gray-600 dark:text-gray-300 font-amiri">
                    {isAr ? 'أبيض ناصع وورق مخطوطات نقي' : 'Clean White & Pure Parchment'}
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Navigation Layout */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gold uppercase tracking-wider block font-mono">
                {isAr ? '2. نمط القائمة والتنقل (Navigation)' : isFr ? '2. Style de Navigation' : '2. Navigation Layout'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Top Bar Layout */}
                <button
                  onClick={() => setNavLayout('top')}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-24 ${
                    navLayout === 'top'
                      ? 'bg-gold/20 border-gold text-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base font-bold font-calligraphy">
                      {isAr ? 'شريط علوي ثابت' : 'Top Navbar'}
                    </span>
                    <div className="w-6 h-2 rounded bg-gold/50" />
                  </div>
                  <span className="text-[11px] text-gray-300 font-amiri">
                    {isAr ? 'الشريط العلوي المعتاد أعلى الصفحة' : 'Classic horizontal header'}
                  </span>
                </button>

                {/* Sidebar Layout */}
                <button
                  onClick={() => setNavLayout('sidebar')}
                  className={`p-4 rounded-2xl border-2 transition-all text-right flex flex-col justify-between h-24 ${
                    navLayout === 'sidebar'
                      ? 'bg-gold/20 border-gold text-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base font-bold font-calligraphy">
                      {isAr ? 'شريط جانبي (Sidebar)' : 'Vertical Sidebar'}
                    </span>
                    <div className="w-2 h-6 rounded bg-gold/50" />
                  </div>
                  <span className="text-[11px] text-gray-300 font-amiri">
                    {isAr ? 'قائمة جانبية عصرية قابلة للطي' : 'Collapsible side navigation bar'}
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Language & Info */}
            <div className="p-4 rounded-2xl bg-black/30 border border-gold/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gold block font-mono">
                  {isAr ? 'لغة العرض (Language)' : 'Language'}
                </span>
                <span className="text-[11px] text-gray-300 font-amiri">
                  {isAr ? 'العربية • English • Français' : 'Select your preferred language'}
                </span>
              </div>
              <LanguageSelector lng={lng} />
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 border-t border-gold/30 flex justify-end">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all shadow-md"
            >
              {isAr ? 'حفظ وإغلاق' : isFr ? 'Enregistrer' : 'Done'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
