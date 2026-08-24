'use client'

import { useTranslation } from '@/i18n/client'
import { motion } from 'framer-motion'
import { StarPattern } from './Motifs'
import Image from 'next/image'
import Link from 'next/link'

const IslamicStarIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3l2.8 2.8H18.2V8.6L21 11.4v2.8l-2.8 2.8v2.8h-2.8l-2.8 2.8-2.8-2.8H5.8v-2.8L3 14.2v-2.8l2.8-2.8V5.8h2.8z" />
  </svg>
);

const TelegramIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.99-.73 3.84-1.67 6.4-2.77 7.67-3.3 3.64-1.51.4-.21.9-.21.11 0 .35.02.5.07.13.04.22.11.26.21.04.09.05.21.02.32z"/>
  </svg>
);

const ExternalLinkIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Footer({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const isAr = lng === 'ar'

  return (
    <footer className="relative py-28 bg-primary text-bg-paper overflow-hidden border-t border-gold/20">
      <StarPattern speed={30} />
      
      {/* Decorative Divider */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Brand Col with High-Contrast White Emblem & Larger Size */}
          <div className="md:col-span-4 space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-5"
            >
              {/* White Background Medallion for Clear Logo Contrast & Increased Size */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white border-2 border-gold shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center p-2.5 flex-shrink-0 group/logo overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover/logo:scale-110">
                   <Image
                      src="/images/logo-tafaquh.png"
                      alt="شعار تَفَقَّه"
                      fill
                      sizes="96px"
                      className="object-contain drop-shadow-sm"
                   />
                </div>
              </div>
              <div className="flex flex-col text-right">
                <span className={`text-3xl sm:text-4xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display uppercase'}`}>
                  {t('project_name')}
                </span>
                <span className="text-xs text-gold/70 mt-1 font-amiri font-bold">
                  {isAr ? 'منصة التأصيل الشرعي والفكري' : 'Islamic Knowledge Foundation'}
                </span>
              </div>
            </motion.div>
            <p className="text-gold/70 font-body text-base lg:text-lg leading-relaxed italic">
              {t('footer_description')}
            </p>
          </div>

          {/* Platforms & Ecosystem Col (Includes Mawiza & Izkur links) */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center gap-3 border-b border-gold/20 pb-3">
              <IslamicStarIcon className="w-4 h-4 text-gold/60" />
              <h4 className="text-gold font-bold text-xs tracking-[0.3em] uppercase">
                {isAr ? 'منصات ومشاريع تَفَقَّه' : 'Tafaqquh Platforms'}
              </h4>
            </div>
            
            <div className="flex flex-col gap-3.5">
              {/* Mawiza Featured Link */}
              <a
                href="https://mawiza.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-gold/10 border border-gold/30 hover:border-gold hover:bg-gold/20 transition-all text-gold group flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-sm block font-calligraphy text-gold group-hover:text-white transition-colors">
                    {isAr ? 'منصة مَوْعِظَة' : 'Maw’izah Platform'}
                  </span>
                  <span className="text-[11px] text-emerald-200/70 block">
                    {isAr ? 'التدبر القرآني والمصحف الشريف' : 'Quranic Reflections & Mushaf'}
                  </span>
                </div>
                <ExternalLinkIcon className="w-4 h-4 text-gold group-hover:translate-x-[-2px] transition-transform" />
              </a>

              {/* Izkur Featured Link */}
              <a
                href="https://izkur.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-gold/10 border border-gold/30 hover:border-gold hover:bg-gold/20 transition-all text-gold group flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-sm block font-calligraphy text-gold group-hover:text-white transition-colors">
                    {isAr ? 'منصة وتطبيق اذْكُرْ' : 'Izkur Platform'}
                  </span>
                  <span className="text-[11px] text-emerald-200/70 block">
                    {isAr ? 'العداد الصوتي الذكي للأذكار والتسبيح' : 'Smart Voice Dhikr Counter'}
                  </span>
                </div>
                <ExternalLinkIcon className="w-4 h-4 text-gold group-hover:translate-x-[-2px] transition-transform" />
              </a>

              <Link
                href={`/${lng}/khatmah`}
                className="text-white/60 hover:text-gold transition-colors text-sm flex items-center gap-2"
              >
                <IslamicStarIcon className="w-3 h-3 text-gold/40" />
                <span>{isAr ? 'تطبيق خَتْمَة (Khatmah)' : 'Khatmah Tracker'}</span>
              </Link>

              <Link
                href={`/${lng}#jalsa`}
                className="text-white/60 hover:text-gold transition-colors text-sm flex items-center gap-2"
              >
                <IslamicStarIcon className="w-3 h-3 text-gold/40" />
                <span>{isAr ? 'مجالس تفقه العلمية' : 'Study Circles'}</span>
              </Link>
            </div>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-2 space-y-6">
             <div className="flex items-center gap-3 border-b border-gold/20 pb-3">
                <IslamicStarIcon className="w-4 h-4 text-gold/60" />
                <h4 className="text-gold font-bold text-xs tracking-[0.3em] uppercase">
                  {t('footer.responsible')}
                </h4>
             </div>
             <div className="flex flex-col gap-3">
                <p className={`text-gold text-base font-bold ${isAr ? 'font-calligraphy' : ''}`}>
                  {t('footer.responsible_name')}
                </p>
                <div className="flex flex-col gap-2.5">
                   <a href={`mailto:${t('footer.email')}`} className="text-white/50 hover:text-gold transition-colors text-xs flex items-center gap-2">
                      <IslamicStarIcon className="w-2.5 h-2.5 text-gold/40" />
                      {t('footer.email')}
                   </a>
                   <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`} className="text-white/50 hover:text-gold transition-colors text-xs flex items-center gap-2">
                      <IslamicStarIcon className="w-2.5 h-2.5 text-gold/40" />
                      {t('footer.phone')}
                   </a>
                   <a href="https://t.me/center_tafaqquh" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold transition-colors text-xs flex items-center gap-2">
                      <TelegramIcon className="w-2.5 h-2.5 text-gold/40" />
                      Telegram
                   </a>
                </div>
             </div>
          </div>

          {/* Sincerity & Legal Col */}
          <div className="md:col-span-3 space-y-6 md:text-right">
             <div className="space-y-3">
                <h4 className="text-gold font-bold text-xs tracking-[0.3em] uppercase border-b border-gold/20 pb-3 inline-block md:ml-auto">
                  {t('footer.spirituality')}
                </h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className={`text-gold text-xl leading-relaxed ${isAr ? 'font-calligraphy' : 'font-display italic'}`}
                >
                  {t('sincerity_msg')}
                </motion.p>
             </div>
             
             <div className="space-y-3 mt-8">
                <p className="text-xs text-white/40 font-body">
                  © {new Date().getFullYear()} TAFAQUH.<br/>
                  {t('footer.all_rights_reserved')}.
                </p>
                <div className="flex gap-4 md:justify-end">
                   <a href="#" className="text-xs text-gold/40 hover:text-gold transition-colors underline decoration-gold/20">
                     {t('legal_mentions')}
                   </a>
                   <span className="text-white/10">|</span>
                   <a href="#" className="text-xs text-gold/40 hover:text-gold transition-colors underline decoration-gold/20">
                     {t('footer.privacy_policy')}
                   </a>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar with Islamic Geometric Feel */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex gap-4 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 border border-gold transform rotate-45" />
              ))}
           </div>
           
           <div className={`flex flex-wrap justify-center gap-8 uppercase text-white/30 font-bold ${isAr ? 'font-calligraphy text-2xl tracking-[0.4em]' : 'text-[11px] tracking-[0.6em]'}`}>
              <span className="hover:text-gold/50 cursor-default">{t('footer.tradition')}</span>
              <span className="text-gold/20">•</span>
              <span className="hover:text-gold/50 cursor-default">{t('footer.innovation')}</span>
              <span className="text-gold/20">•</span>
              <span className="hover:text-gold/50 cursor-default">{t('footer.impact')}</span>
           </div>

           <div className="flex gap-4 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 border border-gold transform rotate-45" />
              ))}
           </div>
        </div>
      </div>
    </footer>
  )
}
