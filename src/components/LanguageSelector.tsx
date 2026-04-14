'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { languages } from '@/i18n/settings'
import { motion } from 'framer-motion'
import { useTranslation } from '@/i18n/client'

export default function LanguageSelector({ lng }: { lng: string }) {
  const pathname = usePathname()
  const { t } = useTranslation(lng)
  
  const redirectedPathname = (targetLng: string) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = targetLng
    return segments.join('/')
  }

  return (
    <div className="flex gap-1.5 p-1 bg-white/5 rounded-full border border-white/10">
      {languages.map((l) => (
        <Link
          key={l}
          href={redirectedPathname(l)}
          className={`relative px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all ${
            lng === l ? 'text-primary' : 'text-white/60 hover:text-white'
          }`}
        >
          {lng === l && (
            <motion.div
              layoutId="activeTabMenu"
              className="absolute inset-0 bg-gold rounded-full z-[-1] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
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
