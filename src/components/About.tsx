'use client'

import { useTranslation } from '@/i18n/client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HexPattern } from './Motifs'

export default function About({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} className="py-40 bg-bg-paper relative overflow-hidden" id="about">
      <HexPattern speed={50} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full md:w-1/2 relative"
          >
            {/* Artistic Frame/Element */}
            <div className="aspect-square relative flex items-center justify-center p-8">
               <div className="absolute inset-0 border-[3px] border-gold rounded-[60px] transform rotate-[15deg] opacity-20" />
               <div className="absolute inset-0 border-[3px] border-primary rounded-[60px] transform rotate-[-5deg] opacity-10" />
               <div className="relative w-full h-full bg-primary rounded-[50px] overflow-hidden flex items-center justify-center shadow-2xl">
                  {/* Stylized background in the about box */}
                  <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gold/10 rounded-full blur-[100px]" />
                  <span className={`text-gold text-9xl opacity-5 transform rotate-[-15deg] whitespace-nowrap px-4 ${lng === 'ar' ? 'font-calligraphy' : 'font-display'}`}>
                    {t('project_name')}
                  </span>
                  <div className="relative z-10 text-center p-8">
                     <span className="block text-gold text-sm tracking-[0.4em] uppercase mb-4">{t('project_name')}</span>
                     <div className="h-px w-12 bg-gold mx-auto" />
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ y }}
            className="w-full md:w-1/2 text-left"
          >
            <motion.h2 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-10 font-display leading-tight"
            >
              {t('about_title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl md:text-2xl text-text-soft leading-relaxed font-body mb-8"
            >
              {t('about_text')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 text-gold"
            >
               <div className="h-px w-16 bg-gold" />
               <span className="font-bold tracking-widest text-sm uppercase">{t('slogan_short')}</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
