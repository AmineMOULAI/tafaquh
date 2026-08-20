'use client'

import { useState } from 'react'
import { useTranslation } from '@/i18n/client'
import { motion } from 'framer-motion'
import { StarPattern } from './Motifs'
import Image from 'next/image'

export default function ContactForm({ lng }: { lng: string }) {
  const { t } = useTranslation(lng)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const octagonalClip = 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'

  return (
    <section className="py-40 bg-bg-paper relative overflow-hidden" id="contact">
      <StarPattern speed={50} />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 opacity-10 pointer-events-none"
          >
             <svg viewBox="0 0 100 100" fill="var(--color-gold)">
                <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
             </svg>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-5xl md:text-7xl font-bold text-primary mb-6 relative z-10 ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}
          >
            {t('contact_title')}
          </motion.h2>
          <div className="h-1 w-32 bg-gold mx-auto shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Decorative Sidebar with Islamic Motif */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex lg:col-span-4 flex-col gap-8 h-full"
          >
             <div className="bg-primary p-12 text-white relative overflow-hidden shadow-2xl h-full"
                  style={{ clipPath: octagonalClip }}>
                <div className="absolute inset-0 opacity-10"
                     style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4 16 16 4-16 4-4 16-4-16-16-4 16-4z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
                       backgroundSize: '20px 20px'
                     }} 
                />
                
                <div className="relative z-10 space-y-8">
                   <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center p-3 md:p-5">
                      <div className="absolute inset-0 bg-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                           style={{ 
                             clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' 
                           }} 
                      />
                      <Image src="/images/logo-tafaquh.png" alt="Logo" width={80} height={80} className="object-contain relative z-10" />
                   </div>
                   <h3 className={`text-3xl font-bold text-gold ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}>
                      {t('project_name')}
                   </h3>
                   <p className="text-white/60 font-body text-lg leading-relaxed">
                      {t('footer_description')}
                   </p>
                   <div className="pt-8 border-t border-white/10 space-y-6">
                      <p className="text-gold font-bold text-sm tracking-widest uppercase">{t('follow_us')}</p>
                      <div className="flex flex-col gap-6">
                         <a href="https://t.me/center_tafaqquh" target="_blank" rel="noopener noreferrer" 
                            className="flex items-center gap-4 text-white/60 hover:text-gold transition-colors group">
                            <div className="w-10 h-10 border border-white/20 group-hover:border-gold flex items-center justify-center rotate-45 transition-colors">
                               <div className="-rotate-45">
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.99-.73 3.84-1.67 6.4-2.77 7.67-3.3 3.64-1.51.4-.21.9-.21.11 0 .35.02.5.07.13.04.22.11.26.21.04.09.05.21.02.32z"/>
                                  </svg>
                               </div>
                            </div>
                            <span className="text-sm font-body tracking-wide">Telegram</span>
                         </a>
                         <a href={`mailto:${t('footer.email')}`}
                            className="flex items-center gap-4 text-white/60 hover:text-gold transition-colors group">
                            <div className="w-10 h-10 border border-white/20 group-hover:border-gold flex items-center justify-center rotate-45 transition-colors">
                               <div className="-rotate-45">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                     <polyline points="22,6 12,13 2,6" />
                                  </svg>
                               </div>
                            </div>
                            <span className="text-sm font-body tracking-wide">{t('footer.email')}</span>
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Main Form Area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white p-8 md:p-16 border-2 border-primary/5 relative overflow-hidden shadow-2xl"
            style={{ clipPath: octagonalClip }}
          >
            {/* Islamic Star Pattern Overlay (Light) */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ 
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l5 25 25 5-25 5-5 25-5-25-25-5 25-5z' fill='%230F291E'/%3E%3C/svg%3E")`,
                   backgroundSize: '40px 40px'
                 }} 
            />

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className={`text-primary font-bold text-xs tracking-[0.3em] uppercase block mb-1 opacity-60 ${lng === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('name_label')}
                  </label>
                  <div className="relative group">
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder={lng === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-primary/10 focus:border-gold outline-none transition-all placeholder:text-text-soft/20 font-body text-lg text-primary"
                    />
                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gold w-0 group-focus-within:w-full transition-all duration-500" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className={`text-primary font-bold text-xs tracking-[0.3em] uppercase block mb-1 opacity-60 ${lng === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t('email_label')}
                  </label>
                  <div className="relative group">
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="name@example.com"
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-primary/10 focus:border-gold outline-none transition-all placeholder:text-text-soft/20 font-body text-lg text-primary"
                    />
                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gold w-0 group-focus-within:w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className={`text-primary font-bold text-xs tracking-[0.3em] uppercase block mb-1 opacity-60 ${lng === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t('message_label')}
                </label>
                <div className="relative group">
                  <textarea 
                    name="message"
                    rows={4} 
                    required
                    placeholder={lng === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                    className="w-full px-0 py-4 bg-transparent border-b-2 border-primary/10 focus:border-gold outline-none transition-all placeholder:text-text-soft/20 font-body text-lg resize-none text-primary"
                  ></textarea>
                  <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gold w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </div>
              
              <motion.button 
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full font-bold py-6 text-xl tracking-[0.2em] transition-all disabled:opacity-50 relative overflow-hidden group border-2 border-primary/10 ${
                  status === 'success' ? 'bg-green-600 text-white' : 
                  status === 'error' ? 'bg-red-600 text-white' : 
                  'bg-primary text-white hover:bg-white hover:text-primary hover:border-gold'
                }`}
                style={{ clipPath: 'polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)' }}
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className={lng === 'ar' ? 'font-calligraphy' : ''}>
                        {lng === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                      </span>
                    </>
                  ) : status === 'success' ? (
                    <span className={lng === 'ar' ? 'font-calligraphy' : ''}>{t('success_msg')}</span>
                  ) : status === 'error' ? (
                    <span className={lng === 'ar' ? 'font-calligraphy' : ''}>{t('error_msg')}</span>
                  ) : (
                    <span className={lng === 'ar' ? 'font-calligraphy text-2xl' : 'font-display uppercase'}>
                      {t('submit_button')}
                    </span>
                  )}
                </div>
                
                {/* Button Decorative Corners */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/40 group-hover:border-gold transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/40 group-hover:border-gold transition-colors" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
