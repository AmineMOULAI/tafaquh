'use client'

import { useTranslation } from '@/i18n/client'
import { motion } from 'framer-motion'
import { StarPattern } from './Motifs'
import Image from 'next/image'

export default function Footer({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)

  return (
    <footer className="relative py-32 bg-primary text-bg-paper overflow-hidden border-t border-gold/20">
      <StarPattern speed={30} />
      
      {/* Decorative Divider */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 items-start">
          
          <div className="md:col-span-2 space-y-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-5xl font-bold text-gold flex items-center gap-6"
            >
              <div className="relative w-16 h-16 border-2 border-gold/40 rounded-2xl flex items-center justify-center p-3 bg-white/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                 <Image
                    src="/images/logo-tafaquh.png"
                    alt="Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                 />
              </div>
              <span className={lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}>
                {t('project_name')}
              </span>
            </motion.div>
            <p className="text-gold/60 font-body text-xl leading-relaxed max-w-md italic">
              {t('footer_description')}
            </p>
          </div>

          <div className="space-y-10">
             <h4 className="text-gold font-bold text-sm tracking-[0.4em] uppercase border-b border-gold/20 pb-4 inline-block">
               {t('follow_us')}
             </h4>
             <div className="flex flex-col gap-6">
                {['Twitter', 'Instagram', 'YouTube', 'Facebook'].map((social) => (
                  <motion.a 
                    key={social}
                    href="#" 
                    whileHover={{ x: 10, color: '#D4AF37' }}
                    className="text-white/50 font-bold hover:text-gold transition-all duration-300 flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-gold/40 rounded-full" />
                    {social}
                  </motion.a>
                ))}
             </div>
          </div>

          <div className="space-y-10 md:text-right">
             <div className="space-y-4">
                <h4 className="text-gold font-bold text-sm tracking-[0.4em] uppercase border-b border-gold/20 pb-4 inline-block md:ml-auto">
                  {t('footer.spirituality')}
                </h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className={`text-gold text-2xl leading-relaxed ${lng === 'ar' ? 'font-calligraphy' : 'font-display italic'}`}
                >
                  {t('sincerity_msg')}
                </motion.p>
             </div>
             
             <div className="space-y-4 mt-12">
                <p className="text-sm text-white/40 font-body">
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
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex gap-4 opacity-20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 border border-gold transform rotate-45" />
              ))}
           </div>
           
           <div className={`flex flex-wrap justify-center gap-8 uppercase text-white/30 font-bold ${lng === 'ar' ? 'font-calligraphy text-2xl tracking-[0.4em]' : 'text-[11px] tracking-[0.6em]'}`}>
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
