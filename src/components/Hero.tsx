'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '@/i18n/client'
import { HexPattern } from './Motifs'
import Image from 'next/image'

export default function Hero({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll(
    isMounted && containerRef.current
      ? { target: containerRef, offset: ["start start", "end start"] }
      : {}
  )

  // Restore Parallax effects from original version
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const isAr = lng === 'ar'

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-paper py-24 px-4">
      
      {/* Background Layered Islamic Background Animations */}
      <div className="absolute inset-0 z-0">
        <HexPattern speed={100} />
        
        {/* Large Subtle Background Logo */}
        <motion.div
          style={{ y: logoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] pointer-events-none"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/logo-tafaquh.png"
              alt="Background Logo"
              fill
              className="object-contain grayscale brightness-150"
            />
          </motion.div>
        </motion.div>

        {/* Animated Large Geometric Shapes */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] opacity-[0.04] text-gold pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              d="M50 0 L61.23 38.77 L100 50 L61.23 61.23 L50 100 L38.77 61.23 L0 50 L38.77 38.77 Z" 
            />
            <circle cx="50" cy="50" r="35" strokeDasharray="3,3" />
          </svg>
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] opacity-[0.03] text-primary pointer-events-none"
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3">
            {[...Array(12)].map((_, i) => (
              <motion.rect 
                key={i} 
                x="15" y="15" width="70" height="70" 
                transform={`rotate(${i * 30} 50 50)`} 
              />
            ))}
          </svg>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <div className="flex flex-col items-center">
          
          {/* Calligraphy Title with Radiant Gold */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-12"
          >
            <h1 className={`font-bold tracking-tight select-none ${isAr ? 'text-8xl md:text-[14rem] lg:text-[18rem] font-calligraphy leading-[1.2] pt-12 pb-8' : 'text-5xl md:text-[8rem] lg:text-[10rem] font-display uppercase leading-[0.85]'}`}>
              <span className="text-gold-radiant drop-shadow-2xl">
                {t('project_name')}
              </span>
            </h1>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent absolute -bottom-2 left-0"
            />
          </motion.div>

          {/* Premium Gold Action Button to Open Letter */}
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative z-20 group mb-12 px-12 py-5 overflow-hidden border-2 border-gold-light/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] bg-primary"
              style={{ clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)' }}
              >

              {/* Gold Radiant Background Animation */}
              <motion.div 
                animate={{ 
                  background: [
                    "linear-gradient(45deg, #1F4D36 0%, #1F4D36 100%)",
                    "linear-gradient(45deg, #1F4D36 0%, #1F4D36 100%)"
                  ]
                }}
                className="absolute inset-0 z-0"
              />
              
              {/* Metallic Shimmer Effect */}
              <motion.div 
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/40 to-transparent skew-x-25 z-1"
              />

              <span className={`relative z-10 text-gold-light font-black tracking-widest uppercase flex items-center gap-4 ${isAr ? 'font-amiri text-2xl' : 'text-sm'}`}>
                <span className="drop-shadow-md">{t('hero.open_letter')}</span>
                <motion.span
                  animate={{ x: isAr ? [-5, 5, -5] : [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {isAr ? '←' : '→'}
                </motion.span>
              </span>
            </motion.button>
          )}

          {/* Scroll (Rouleau) Letter Section */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
            <AnimatePresence>
              {isOpen && (
                <div className="relative w-full flex flex-col items-center">
                  
                  {/* Top Cylinder of the scroll - Radiant Gold Ends */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-20 w-full max-w-[98%] h-10 bg-gradient-to-b from-gold-muted via-gold-light to-gold-muted rounded-full shadow-2xl border-b border-black/20 flex items-center justify-between px-4 overflow-hidden"
                  >
                     {/* Polished wood/metal texture */}
                     <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                     <div className="w-6 h-6 rounded-full bg-gold-light shadow-inner border border-gold-muted flex-shrink-0" />
                     <div className="w-6 h-6 rounded-full bg-gold-light shadow-inner border border-gold-muted flex-shrink-0" />
                  </motion.div>

                  {/* Parchment that unrolls */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 2, ease: [0.45, 0.05, 0.55, 0.95] }}
                    className="relative w-full overflow-hidden bg-[#FDFBF7] shadow-2xl border-x-4 border-gold-muted/30"
                  >
                    {/* Parchment texture & content */}
                    <div className="relative z-10 p-10 md:p-24 flex flex-col items-center min-h-[400px]">
                      {/* Natural paper texture */}
                      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                      
                      {/* Gold watermark in the letter */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.05] pointer-events-none">
                        <Image src="/images/logo-tafaquh.png" alt="" fill className="object-contain" />
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1.2 }}
                        className={`w-full max-w-3xl text-center leading-[1.8] ${isAr ? 'font-calligraphy text-2xl md:text-4xl' : 'font-handwriting text-2xl md:text-3xl'} text-primary/95 drop-shadow-sm`}
                      >
                        <p className="whitespace-pre-line">
                          {t('hero.content')}
                        </p>
                      </motion.div>
                    </div>

                    {/* Gold illumination accents on the parchment */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold/40" />
                    <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gold/40" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gold/40" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold/40" />
                  </motion.div>

                  {/* Bottom Cylinder of the scroll */}
                  <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.45, 0.05, 0.55, 0.95] }}
                    className="relative z-20 w-full max-w-[98%] h-10 bg-gradient-to-b from-gold-muted via-gold-light to-gold-muted rounded-full shadow-2xl border-t border-black/20 flex items-center justify-between px-4 overflow-hidden"
                  >
                     <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                     <div className="w-6 h-6 rounded-full bg-gold-light shadow-inner border border-gold-muted flex-shrink-0" />
                     <div className="w-6 h-6 rounded-full bg-gold-light shadow-inner border border-gold-muted flex-shrink-0" />
                  </motion.div>

                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="mt-20 flex flex-col items-center gap-6"
          >
            <div className="relative w-px h-32 bg-gold/30 overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-light to-transparent"
              />
            </div>
            <span className="text-gold-light font-body text-xs tracking-[0.5em] uppercase opacity-70 font-black">
              {t('to_be_continued')}
            </span>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
