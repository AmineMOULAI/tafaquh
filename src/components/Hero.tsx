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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

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
      
      {/* RESTORED: Layered Islamic Background Animations */}
      <div className="absolute inset-0 z-0">
        <HexPattern speed={100} />
        
        {/* RESTORED: Large Subtle Background Logo */}
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

        {/* RESTORED: Animated Large Geometric Shapes */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] opacity-[0.03] text-gold pointer-events-none"
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
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] opacity-[0.02] text-primary pointer-events-none"
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
          
          {/* RESTORED: Calligraphy Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-12"
          >
            <h1 className={`font-bold text-primary tracking-tight select-none ${isAr ? 'text-8xl md:text-[14rem] lg:text-[18rem] font-calligraphy leading-[1.2] pt-12 pb-8' : 'text-5xl md:text-[8rem] lg:text-[10rem] font-display uppercase leading-[0.85]'}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-gold/40 drop-shadow-2xl">
                {t('project_name')}
              </span>
            </h1>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent absolute -bottom-2 left-0"
            />
          </motion.div>

          {/* Action Button to Open Letter */}
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative group mb-12 px-10 py-4 overflow-hidden rounded-full border border-gold/50 shadow-lg bg-primary"
            >
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

          {/* Scroll (Rouleau) Letter Section */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
            <AnimatePresence>
              {isOpen && (
                <div className="relative w-full flex flex-col items-center">
                  
                  {/* Top Cylinder of the scroll */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    className="relative z-20 w-full max-w-[95%] h-8 bg-gradient-to-b from-[#8B6B40] via-[#C5A96A] to-[#8B6B40] rounded-full shadow-lg border-b border-black/10 flex items-center justify-center overflow-hidden"
                  >
                     {/* Wood/Gold texture */}
                     <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                  </motion.div>

                  {/* Parchment that unrolls */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 1.8, ease: [0.45, 0.05, 0.55, 0.95] }}
                    className="relative w-full overflow-hidden bg-[#FDFBF7] shadow-2xl border-x-[1px] border-gold/20"
                  >
                    {/* Parchment texture & content */}
                    <div className="relative z-10 p-8 md:p-20 flex flex-col items-center min-h-[300px]">
                      {/* Natural paper texture */}
                      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                      
                      {/* Subtle watermark in the letter */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
                        <Image src="/images/logo-tafaquh.png" alt="" fill className="object-contain" />
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className={`w-full max-w-3xl text-center leading-[1.8] ${isAr ? 'font-calligraphy text-2xl md:text-3xl' : 'font-handwriting text-xl md:text-2xl'} text-primary/90 drop-shadow-sm`}
                      >
                        <p className="whitespace-pre-line">
                          {t('hero.content')}
                        </p>
                      </motion.div>
                    </div>

                    {/* Gold illumination accents on the parchment */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/30" />
                    <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-gold/30" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-gold/30" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/30" />
                  </motion.div>

                  {/* Bottom Cylinder of the scroll */}
                  <motion.div
                    initial={{ y: -32 }} // Start right under top cylinder
                    animate={{ y: 0 }}
                    transition={{ duration: 1.8, ease: [0.45, 0.05, 0.55, 0.95] }}
                    className="relative z-20 w-full max-w-[95%] h-8 bg-gradient-to-b from-[#8B6B40] via-[#C5A96A] to-[#8B6B40] rounded-full shadow-lg border-t border-black/10 flex items-center justify-center overflow-hidden"
                  >
                     <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                  </motion.div>

                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="relative w-px h-24 bg-gold/20 overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-gold to-transparent"
              />
            </div>
            <span className="text-gold font-body text-xs tracking-[0.4em] uppercase opacity-50">
              {t('to_be_continued')}
            </span>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
