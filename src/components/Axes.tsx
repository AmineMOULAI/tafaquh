'use client'

import { useTranslation } from '@/i18n/client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { StarPattern } from './Motifs'
import Image from 'next/image'

const axeKeys = ['foundations', 'religion', 'research', 'writing', 'impact']

export default function Axes({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={ref} className="py-32 bg-primary relative overflow-hidden" id="axes">
      <StarPattern speed={-150} />
      
      {/* Background Decorative Large Islamic Star */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="var(--color-gold)" strokeWidth="0.2">
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="10" y="10" width="80" height="80" transform={`rotate(${i * 15} 50 50)`} />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {axeKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
              className="glass p-10 rounded-[40px] group relative overflow-hidden h-full flex flex-col justify-between hover:border-gold/50 shadow-2xl"
            >
              {/* Card Corner Geometric Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
                  <path d="M100 0 L100 40 L80 40 L80 20 L40 20 L40 0 Z" />
                </svg>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-primary transition-all duration-500 transform group-hover:rotate-[360deg]">
                    <span className="text-2xl font-bold font-display">{index + 1}</span>
                  </div>
                  <div className="relative w-14 h-14 opacity-20 group-hover:opacity-60 transition-all duration-500">
                    <Image
                      src="/images/logo-tafaquh.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className={`text-2xl lg:text-3xl font-bold text-white mb-6 leading-snug ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase tracking-tight'}`}>
                  {t(`axes.${key}`).split('\n')[0]}
                </h3>
                <div className="w-12 h-1 bg-gold/30 mb-6 rounded-full group-hover:w-full transition-all duration-700" />
                <p className="text-gold/70 text-lg font-body leading-relaxed group-hover:text-gold transition-colors">
                   {t(`axes.${key}`).split('\n')[1]}
                </p>
              </div>

              {/* Card Bottom Geometric Pattern */}
              <div className="mt-10 pt-6 border-t border-white/5 opacity-20">
                <div className="flex gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 border border-gold transform rotate-45" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
