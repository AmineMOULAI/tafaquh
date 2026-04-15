'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/client'
import { StarPattern } from './Motifs'
import LogoAnimation from './LogoAnimation'

const languageOptions = [
  { code: 'ar', label: 'العربية', dir: 'rtl', font: 'font-amiri' },
  { code: 'fr', label: 'FRANÇAIS', dir: 'ltr', font: 'font-garamond' },
  { code: 'en', label: 'ENGLISH', dir: 'ltr', font: 'font-garamond' }
]

export default function Hero({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const [activeTab, setActiveTab] = useState(lng)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setActiveTab(lng)
  }, [lng])

  const currentLang = languageOptions.find(l => l.code === activeTab) || languageOptions[0]

  if (!isMounted) return null

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-paper py-20 px-4">
      {/* Background Watermark */}
      <StarPattern speed={-30} />
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 mb-12"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ 
              filter: ["drop-shadow(0 0 2px rgba(197, 169, 106, 0.2))", "drop-shadow(0 0 15px rgba(197, 169, 106, 0.5))", "drop-shadow(0 0 2px rgba(197, 169, 106, 0.2))"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogoAnimation />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-display text-primary flex flex-col md:flex-row items-center gap-4">
            <span className="tracking-widest">TAFAQUH</span>
            <span className="hidden md:inline text-gold/40 text-2xl">—</span>
            <span className="font-amiri text-5xl md:text-7xl">تَفَقُّه</span>
          </h1>
        </div>
      </motion.div>

      {/* Unfolding Letter Section */}
      <div className="relative z-10 w-full max-w-4xl perspective-[2000px]">
        <motion.div
          initial={{ rotateX: -90, opacity: 0, height: 0 }}
          animate={{ rotateX: 0, opacity: 1, height: "auto" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{ originY: 0 }}
          className="relative"
        >
          {/* Parchment Container */}
          <div className="relative bg-[#FDFBF7] shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_100px_rgba(197,169,106,0.05)] border-[1px] border-gold/20 p-1 md:p-2 overflow-hidden">
            
            {/* Geometric Border Layer */}
            <div className="absolute inset-0 border-[16px] border-transparent pointer-events-none opacity-40"
                 style={{ 
                   borderImageSource: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z' fill='%23C5A96A'/%3E%3C/svg%3E")`,
                   borderImageSlice: '40',
                   borderImageRepeat: 'repeat'
                 }} 
            />

            {/* Content Area */}
            <div className="relative z-10 bg-white/40 backdrop-blur-[1px] p-8 md:p-16 min-h-[400px] flex flex-col items-center">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className={`w-full max-w-3xl text-center leading-relaxed ${currentLang.font} ${currentLang.dir === 'rtl' ? 'rtl' : 'ltr'}`}
                >
                  <p className="text-primary/90 text-lg md:text-xl whitespace-pre-line">
                    {t('hero.content')}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Gold illumination accents (Corners) */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold opacity-60" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold opacity-60" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold opacity-60" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold opacity-60" />
          </div>
          
          {/* Shadow beneath the letter */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/5 blur-2xl rounded-[100%] z-[-1]" />
        </motion.div>
      </div>

      {/* Language Selector Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 flex items-center justify-center gap-4 z-10"
      >
        <div className="flex bg-primary/5 p-1 rounded-full border border-gold/20 backdrop-blur-md">
          {languageOptions.map((opt) => (
            <button
              key={opt.code}
              onClick={() => setActiveTab(opt.code)}
              className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === opt.code ? 'text-white' : 'text-primary/60 hover:text-primary'
              }`}
            >
              {activeTab === opt.code && (
                <motion.div
                  layoutId="heroActiveTab"
                  className="absolute inset-0 bg-primary shadow-lg"
                  style={{ borderRadius: 999 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-gold">{t('to_be_continued')}</span>
      </motion.div>
    </section>
  )
}
