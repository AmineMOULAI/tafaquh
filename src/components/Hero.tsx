'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n/client'
import { StarPattern } from './Motifs'
import LogoAnimation from './LogoAnimation'

export default function Hero({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const isAr = lng === 'ar'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-paper py-20 px-4">
      {/* Background Watermark */}
      <StarPattern speed={-30} />
      
      {/* Subtle background glow - Refined Gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />

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
              filter: ["drop-shadow(0 0 2px rgba(197, 169, 106, 0.3))", "drop-shadow(0 0 20px rgba(197, 169, 106, 0.6))", "drop-shadow(0 0 2px rgba(197, 169, 106, 0.3))"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogoAnimation />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-display text-primary flex flex-col md:flex-row items-center gap-4">
            <span className="tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/80">TAFAQUH</span>
            <span className="hidden md:inline text-gold/40 text-2xl">—</span>
            <span className="font-amiri text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/80">تَفَقُّه</span>
          </h1>
        </div>
      </motion.div>

      {/* Action Button to Open Letter */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative z-20 group mb-12 px-10 py-4 overflow-hidden rounded-full border border-gold/50 shadow-lg"
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary transition-all duration-500 group-hover:via-primary group-hover:scale-110" />
          
          {/* Shimmer Effect */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent skew-x-12"
          />

          <span className={`relative z-10 text-gold font-bold tracking-widest uppercase flex items-center gap-3 ${isAr ? 'font-amiri text-xl' : 'text-sm'}`}>
            {t('hero.open_letter')}
            <motion.span
              animate={{ x: isAr ? [-4, 4, -4] : [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {isAr ? '←' : '→'}
            </motion.span>
          </span>
        </motion.button>
      )}

      {/* Unfolding Letter Section */}
      <div className="relative z-10 w-full max-w-4xl perspective-[2000px]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ rotateX: -90, opacity: 0, height: 0 }}
              animate={{ rotateX: 0, opacity: 1, height: "auto" }}
              exit={{ rotateX: -90, opacity: 0, height: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="relative"
            >
              {/* Parchment Container */}
              <div className="relative bg-[#FDFBF7] shadow-[0_30px_70px_rgba(0,0,0,0.15),inset_0_0_120px_rgba(197,169,106,0.08)] border-[1px] border-gold/30 p-1 md:p-2 overflow-hidden">
                
                {/* Geometric Border Layer - Stronger Gold presence */}
                <div className="absolute inset-0 border-[16px] border-transparent pointer-events-none opacity-50"
                     style={{ 
                       borderImageSource: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z' fill='%23C5A96A'/%3E%3C/svg%3E")`,
                       borderImageSlice: '40',
                       borderImageRepeat: 'repeat'
                     }} 
                />

                {/* Content Area */}
                <div className="relative z-10 bg-white/50 backdrop-blur-[2px] p-8 md:p-16 min-h-[400px] flex flex-col items-center">
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`w-full max-w-3xl text-center leading-relaxed ${isAr ? 'font-amiri rtl' : 'font-garamond ltr'}`}
                  >
                    <p className="text-primary/90 text-lg md:text-xl whitespace-pre-line drop-shadow-sm">
                      {t('hero.content')}
                    </p>
                  </motion.div>
                </div>

                {/* Shimmering Gold Corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/60 shadow-[-5px_-5px_15px_rgba(197,169,106,0.2)]" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/60 shadow-[5px_-5px_15px_rgba(197,169,106,0.2)]" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/60 shadow-[-5px_5px_15px_rgba(197,169,106,0.2)]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/60 shadow-[5px_5px_15px_rgba(197,169,106,0.2)]" />
              </div>
              
              {/* Shadow beneath the letter */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[95%] h-16 bg-black/10 blur-3xl rounded-[100%] z-[-1]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => {
           if (!isOpen) setIsOpen(true)
        }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-gold">{t('to_be_continued')}</span>
      </motion.div>
    </section>
  )
}
