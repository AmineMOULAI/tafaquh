'use client'

import { useTranslation } from '@/i18n/client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { HexPattern, TafaqquhEmblem, IslamicWatermark } from './Motifs'
import { StarGeometricIcon } from './jalsa/Icons'

export default function About({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
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
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const isAr = lng === 'ar'

  return (
    <section ref={ref} className="py-32 bg-bg-paper relative overflow-hidden" id="about">
      <HexPattern speed={50} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 relative"
          >
            {/* Artistic Frame with Official Brand Emblem */}
            <div className="aspect-square relative flex items-center justify-center p-8">
               <div className="absolute inset-0 border-[2px] border-gold rounded-[60px] transform rotate-[10deg] opacity-25" />
               <div className="absolute inset-0 border-[2px] border-primary rounded-[60px] transform rotate-[-6deg] opacity-20" />
               <div className="relative w-full h-full bg-gradient-to-br from-[#0B3B2C] via-[#0A261A] to-[#061A12] rounded-[50px] overflow-hidden flex flex-col items-center justify-center shadow-2xl p-8 border border-gold/40">
                  <IslamicWatermark className="opacity-[0.04]" />
                  <div className="absolute top-[-40%] right-[-40%] w-full h-full bg-gold/15 rounded-full blur-[80px]" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <TafaqquhEmblem className="w-28 h-28 md:w-36 md:h-36 drop-shadow-2xl" />
                    <span className="block text-gold text-sm tracking-[0.3em] uppercase font-bold font-mono">{t('project_name')}</span>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <span className="text-xs text-emerald-200/80 font-amiri font-bold">{t('slogan_short')}</span>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ y }}
            className={`w-full md:w-1/2 ${isAr ? 'text-right' : 'text-left'}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <StarGeometricIcon className="w-3.5 h-3.5 text-gold" />
              <span>{t('menu.about')}</span>
            </div>

            <motion.h2 
              initial={{ opacity: 0, x: isAr ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl lg:text-6xl font-bold text-gold mb-6 leading-tight ${
                isAr ? 'font-calligraphy' : 'font-display'
              }`}
            >
              {t('about_title')}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: isAr ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-text-soft leading-loose font-amiri font-bold mb-8"
            >
              {t('about_text')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`flex items-center gap-4 text-gold ${isAr ? 'justify-start' : 'justify-start'}`}
            >
               <div className="h-0.5 w-16 bg-gradient-to-r from-gold to-transparent" />
               <span className="font-bold tracking-widest text-xs uppercase font-mono">{t('slogan_short')}</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

