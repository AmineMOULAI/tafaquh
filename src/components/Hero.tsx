'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from '@/i18n/client'
import { HexPattern } from './Motifs'
import Image from 'next/image'

export default function Hero({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-paper py-24">
      {/* Layered Islamic Background Animations */}
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

        {/* Floating Light Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold/15 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <div className="flex flex-col items-center">
          
          {/* Scaled Title */}
          <motion.div
            style={{ scale: scaleTitle }}
            className="relative mb-8"
          >
            <h1 className={`font-bold text-primary tracking-tight leading-[0.85] select-none ${lng === 'ar' ? 'text-8xl md:text-[14rem] lg:text-[18rem] font-calligraphy' : 'text-5xl md:text-[8rem] lg:text-[10rem] font-display uppercase'}`}>
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
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="text-xl md:text-3xl text-text-soft max-w-4xl mx-auto mb-20 font-body leading-relaxed"
          >
            {t('slogan')}
          </motion.p>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="flex flex-col items-center gap-4"
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
