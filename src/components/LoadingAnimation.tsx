'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n/client'

export default function LoadingAnimation({ lng }: { lng?: string }) {
  const { t } = useTranslation(lng || 'ar')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center p-6"
    >
      <div className="relative w-48 h-48 mb-12">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-gold opacity-40 rounded-xl"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
        
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-current">
            <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className={`text-4xl md:text-5xl font-bold text-gold tracking-widest ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}>
          {t('project_name')}
        </h2>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gold/60 font-body tracking-[0.2em] uppercase text-xs">
            {lng === 'ar' ? 'المشروع قيد التطوير' : 'Project is under development'}
          </p>
          <p className="text-gold/40 font-body text-sm italic">
            {lng === 'ar' ? 'نعمل على توفير أفضل تجربة لكم...' : 'Working on providing the best experience...'}
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-20 w-64 h-px bg-white/10 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </motion.div>
  )
}
