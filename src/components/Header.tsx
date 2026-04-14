'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LanguageSelector from './LanguageSelector'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n/client'

export default function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = ['about', 'axes', 'contact']

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          animate={{ 
            backgroundColor: isScrolled ? "rgba(15, 41, 30, 0.98)" : "rgba(15, 41, 30, 0.92)",
            paddingTop: isScrolled ? "8px" : "14px",
            paddingBottom: isScrolled ? "8px" : "14px",
            borderColor: isScrolled ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0.3)"
          }}
          className="backdrop-blur-3xl px-6 md:px-10 rounded-[30px] md:rounded-[50px] flex justify-between items-center border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group transition-all duration-500"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          <Link href={`/${lng}`} className="flex items-center gap-4 md:gap-6 group/logo relative z-10">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              animate={{ 
                boxShadow: isScrolled ? "0_0_15px_rgba(212,175,55,0.2)" : "0_0_25px_rgba(212,175,55,0.3)"
              }}
              className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center p-2.5 md:p-3.5 border border-gold/40 transition-all group-hover/logo:border-gold group-hover/logo:bg-white/20"
            >
              <Image
                src="/images/logo-tafaquh.png"
                alt="TAFAQUH Logo"
                width={48}
                height={48}
                className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className={`font-bold text-2xl md:text-3xl text-gold tracking-tight leading-none ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}>
                {t('project_name')}
              </span>
              <span className="text-[9px] md:text-[11px] text-gold/60 font-display uppercase tracking-[0.3em] mt-1 hidden sm:block">
                {t('slogan_short')}
              </span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10 relative z-10">
             {menuItems.map((item) => (
                <Link 
                  key={item}
                  href={`#${item}`} 
                  className="relative text-white font-bold text-lg md:text-xl font-display hover:text-gold transition-colors py-1 group/nav"
                >
                  {t(`menu.${item}`)}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover/nav:w-full transition-all duration-300" 
                  />
                </Link>
             ))}
          </nav>

          <div className="flex items-center gap-4 relative z-10">
            <div className="h-8 w-px bg-gold/30 hidden md:block mx-2" />
            <LanguageSelector lng={lng} />
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none">
             <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold" />
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 opacity-20 pointer-events-none">
             <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold" />
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
