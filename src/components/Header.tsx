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
            backgroundColor: isScrolled ? "rgba(10, 20, 15, 0.98)" : "rgba(15, 30, 25, 0.94)",
            paddingTop: isScrolled ? "4px" : "8px",
            paddingBottom: isScrolled ? "4px" : "8px",
            borderColor: "rgba(212, 175, 55, 0.6)"
          }}
          style={{
            clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'
          }}
          className="backdrop-blur-3xl px-8 md:px-12 flex justify-between items-center border border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 group transition-all duration-500"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none" />
          
          {/* Islamic Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%23D4AF37' fill-opacity='1'/%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px'
               }} 
          />
          
          <Link href={`/${lng}`} className="flex items-center gap-4 md:gap-6 group/logo relative z-10">
            {/* Logo Container with Islamic Geometric background to show green logo */}
            {/* Using large dimensions and negative margin to not affect the menu height while looking very big */}
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="relative w-24 h-24 md:w-44 md:h-44 flex items-center justify-center p-3 md:p-6 -my-10 md:-my-16"
            >
               <div className="absolute inset-0 bg-gold shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                    style={{ 
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' 
                    }} 
               />
               <Image
                src="/images/logo-tafaquh.png"
                alt="TAFAQUH Logo"
                width={160}
                height={160}
                className="object-contain relative z-10"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className={`font-bold text-gold tracking-tight leading-none ${lng === 'ar' ? 'text-2xl md:text-4xl font-calligraphy' : 'text-xl md:text-2xl font-display uppercase'}`}>
                {t('project_name')}
              </span>
              <span className="text-[8px] md:text-[10px] text-gold/60 font-display uppercase tracking-[0.3em] mt-1 hidden sm:block">
                {t('slogan_short')}
              </span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 relative z-10">
             {menuItems.map((item) => (
                <Link 
                  key={item}
                  href={`/${lng}#${item}`} 
                  className="relative text-white font-bold text-lg md:text-xl font-display hover:text-gold transition-colors py-1 group/nav"
                >
                  {t(`menu.${item}`)}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                  />
                </Link>
             ))}
             <Link 
               href={`/${lng}/jalsa`} 
               className="relative text-[#D4AF37] font-bold text-lg md:text-xl font-calligraphy hover:text-white transition-all py-1 px-4 border border-gold/40 rounded-xl bg-gold/10 hover:bg-gold/20 flex items-center gap-2 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
             >
               <span>🎙️</span>
               <span>{lng === 'ar' ? 'جَلْسَة' : 'JALSA'}</span>
             </Link>
             <Link 
               href={`/${lng}/izkur`} 
               className="relative text-[#D4AF37] font-bold text-lg md:text-xl font-calligraphy hover:text-white transition-all py-1 px-4 border border-gold/40 rounded-xl bg-gold/10 hover:bg-gold/20 flex items-center gap-2 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
             >
               <span>📿</span>
               <span>اذْكُرْ</span>
             </Link>
          </nav>

          <div className="flex items-center gap-4 relative z-10">
            <div className="h-8 w-px bg-gold/30 hidden md:block mx-2" />
            <LanguageSelector lng={lng} />
          </div>

          {/* Decorative Corner Elements - Pillar Style */}
          <div className="absolute top-0 right-0 w-8 h-full opacity-60 pointer-events-none flex flex-col justify-between p-1">
             <div className="w-full h-8 border-t-2 border-r-2 border-gold" />
             <div className="w-full h-8 border-b-2 border-r-2 border-gold" />
          </div>
          <div className="absolute top-0 left-0 w-8 h-full opacity-60 pointer-events-none flex flex-col justify-between p-1">
             <div className="w-full h-8 border-t-2 border-l-2 border-gold" />
             <div className="w-full h-8 border-b-2 border-l-2 border-gold" />
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
