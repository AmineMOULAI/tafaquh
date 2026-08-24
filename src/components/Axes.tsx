'use client'

import { useTranslation } from '@/i18n/client'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { StarPattern } from './Motifs'
import Image from 'next/image'

const axeKeys = ['foundations', 'religion', 'research', 'writing', 'impact']

export default function Axes({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const [expandedAxe, setExpandedAxe] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll(
    isMounted && ref.current
      ? { target: ref, offset: ["start end", "end start"] }
      : {}
  )
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={ref} className="py-32 bg-primary relative overflow-hidden" id="axes">
      <StarPattern speed={-150} />
      
      {/* Background Decorative Large Islamic Star */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="var(--color-gold)" strokeWidth="0.1">
          {[...Array(12)].map((_, i) => (
            <motion.rect 
              key={i} 
              initial={{ rotate: i * 15 }}
              animate={{ rotate: (i * 15) + 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              x="10" y="10" width="80" height="80" 
              transform={`rotate(${i * 15} 50 50)`} 
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`text-center text-4xl md:text-6xl font-bold text-gold mb-20 ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}
        >
          {t('menu.axes')}
        </motion.h2>

        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {axeKeys.map((key, index) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setExpandedAxe(expandedAxe === key ? null : key)}
              className={`glass cursor-pointer p-8 md:p-10 rounded-[40px] group relative overflow-hidden transition-all duration-500 border border-white/10 hover:border-gold/40 shadow-2xl ${expandedAxe === key ? 'lg:col-span-2 row-span-2 ring-2 ring-gold' : 'h-full'}`}
            >
              {/* Card Corner Geometric Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
                  <path d="M100 0 L100 40 L80 40 L80 20 L40 20 L40 0 Z" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="relative">
                    <motion.div 
                      className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-primary transition-all duration-500"
                    >
                      <span className="text-2xl font-bold font-display">{index + 1}</span>
                    </motion.div>
                  </div>
                  
                  {/* Decorative Islamic Geometric Frame for logo */}
                  <div className="relative w-12 h-12 rounded-xl bg-white border border-gold/50 shadow-md flex items-center justify-center p-1 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/logo-tafaquh.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <h3 className={`text-2xl lg:text-3xl font-bold text-gold mb-3 leading-tight ${lng === 'ar' ? 'font-calligraphy' : 'font-title uppercase tracking-tight'}`}>
                  {t(`axes.${key}`).split('\n')[0]}
                </h3>
                
                <p className="text-emerald-100/80 text-base font-essay leading-relaxed mb-6">
                   {t(`axes.${key}`).split('\n')[1]}
                </p>

                <AnimatePresence>
                  {expandedAxe === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 pt-6 border-t border-gold/20"
                    >
                      <motion.p 
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className={`text-white text-xl md:text-2xl leading-relaxed ${lng === 'ar' ? 'font-calligraphy text-right' : 'font-body'}`}
                      >
                        {t(`axes.details.${key}`)}
                      </motion.p>
                      
                      <div className="mt-8 flex items-center gap-4 text-gold/40">
                         <div className="h-px flex-1 bg-gold/20" />
                         <div className="w-2 h-2 border border-gold rotate-45" />
                         <div className="h-px flex-1 bg-gold/20" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!expandedAxe && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-auto pt-6"
                  >
                    <span className="text-gold font-display text-xs tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                       {lng === 'ar' ? 'انقر للتفاصيل' : 'Click for details'}
                       <motion.span
                         animate={{ x: [0, 5, 0] }}
                         transition={{ repeat: Infinity, duration: 1.5 }}
                       >
                         {lng === 'ar' ? '←' : '→'}
                       </motion.span>
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Card Bottom Geometric Pattern */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
