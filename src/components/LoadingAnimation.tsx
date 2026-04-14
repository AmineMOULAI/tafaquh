'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n/client'
import Image from 'next/image'

export default function LoadingAnimation({ lng }: { lng?: string }) {
  const { t } = useTranslation(lng || 'ar')
  const [isVisible, setIsVisible] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    // Longer reveal for "preparation" feel
    const timer = setTimeout(() => setIsVisible(false), 6000)
    const statusTimer = setTimeout(() => setShowStatus(true), 1500)

    return () => {
      clearTimeout(timer)
      clearTimeout(statusTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.05,
          filter: "blur(20px)",
          transition: { duration: 1.5, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-[100] bg-[#0F291E] flex flex-col items-center justify-center p-6 overflow-hidden"
      >
        {/* Animated Islamic Background Pattern - Subtle Gold on Green */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          className="absolute inset-0 pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0l8 32 32 8-32 8-8 32-8-32-32-8 32-8z' fill='%23D4AF37' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Architectural "Blueprint" Lines Animation - Gold on Green */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           {[...Array(4)].map((_, i) => (
             <motion.div
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, delay: i * 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
             >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                   <motion.rect 
                     x="10" y="10" width="80" height="80" 
                     stroke="#D4AF37" strokeWidth="0.05" fill="none"
                     transform={`rotate(${i * 22.5} 50 50)`}
                   />
                </svg>
             </motion.div>
           ))}
        </div>

        {/* Central "Construction" Animation */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 mb-16 flex items-center justify-center">
          {/* Building the geometric layers */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1 - i * 0.15, rotate: 0, opacity: 0.2 + (4-i) * 0.1 }}
              transition={{ duration: 2, delay: i * 0.4, ease: "easeOut" }}
              className="absolute inset-0 border-[2px] border-gold"
              style={{ 
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            />
          ))}

          {/* Logo Assembly Reveal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
            className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center z-10"
          >
            {/* Glowing Aura from behind logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-4 bg-gold/20 rounded-full blur-[80px]"
            />
            
            {/* White/Gold Geometric Shield for the logo to ensure visibility on green bg */}
            <div className="absolute inset-0 bg-[#FDFBF7] shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                 style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
            
            <div className="absolute inset-[4px] bg-gold/10 border-2 border-gold/30"
                 style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />

            <Image
              src="/images/logo-tafaquh.png"
              alt="Logo"
              width={180}
              height={180}
              className="object-contain relative z-10"
            />
          </motion.div>
        </div>

        {/* Narrative Text Animation */}
        <div className="text-center space-y-10 z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <h2 className={`text-6xl md:text-[6.5rem] font-bold text-gold leading-tight ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}>
              {t('preparation.title')}
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-gold/80 font-body text-xl md:text-2xl italic tracking-wide"
            >
              {t('preparation.subtitle')}
            </motion.p>
          </motion.div>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />

          {/* Status Message */}
          <AnimatePresence mode="wait">
            {showStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <p className="text-white font-body tracking-[0.5em] uppercase text-[10px] md:text-xs font-bold">
                  {t('preparation.status')}
                </p>
                <p className="text-gold/60 font-body text-sm md:text-base max-w-md mx-auto leading-relaxed px-4">
                  {t('preparation.message')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Construction Particles / Islamic Motif pulsars */}
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(12)].map((_, i) => (
             <motion.div 
               key={i}
               initial={{ 
                 x: "50%", 
                 y: "50%", 
                 scale: 0, 
                 opacity: 0 
               }}
               animate={{ 
                 x: `${10 + (i * 7)}%`, 
                 y: `${20 + (Math.sin(i) * 30 + 30)}%`,
                 scale: [0, 1, 0.5],
                 opacity: [0, 0.3, 0]
               }}
               transition={{ 
                 duration: 10, 
                 repeat: Infinity, 
                 delay: i * 0.8,
                 ease: "easeInOut"
               }}
               className="absolute w-1.5 h-1.5 bg-gold rotate-45" 
             />
           ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
