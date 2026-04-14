'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { languages } from '@/i18n/settings'
import { motion } from 'framer-motion'
// import { useTranslation } from '@/i18n/client' // Removed as 't' is unused in previous version

export default function LanguageSelector({ lng }: { lng: string }) {
  const pathname = usePathname()
  
  const redirectedPathname = (targetLng: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = targetLng
    return segments.join('/')
  }

  // Octagonal clip path for the container and items
  const octagonalClip = 'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)'

  return (
    <div 
      className="flex gap-1.5 p-1 bg-black/20 border border-gold/30"
      style={{ clipPath: octagonalClip }}
    >
      {languages.map((l) => (
        <Link
          key={l}
          href={redirectedPathname(l)}
          className={`relative px-4 py-1.5 text-[10px] md:text-xs font-bold transition-all ${
            lng === l ? 'text-primary' : 'text-white/60 hover:text-white'
          }`}
          style={{ clipPath: octagonalClip }}
        >
          {lng === l && (
            <motion.div
              layoutId="activeTabMenu"
              className="absolute inset-0 bg-gold z-[-1] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              style={{ clipPath: octagonalClip }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 whitespace-nowrap tracking-widest uppercase">
            {l}
          </span>
        </Link>
      ))}
    </div>
  )
}
