'use client'

import { useState } from 'react'
import { useTranslation } from '@/i18n/client'
import { motion } from 'framer-motion'
import { StarPattern } from './Motifs'

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
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className="py-40 bg-bg-paper relative overflow-hidden" id="contact">
      <StarPattern speed={50} />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 ${lng === 'ar' ? 'font-calligraphy' : 'font-display uppercase'}`}
          >
            {t('contact_title')}
          </motion.h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden bg-white/40"
        >
          {/* Subtle Geometric Background for Form */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <svg width="100%" height="100%">
                <pattern id="contact-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="var(--color-primary)" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#contact-pattern)" />
             </svg>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-primary font-bold text-sm tracking-widest uppercase ml-2 opacity-70">{t('name_label')}</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  placeholder={lng === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                  className="w-full px-6 py-4 rounded-2xl border border-primary/10 bg-white/60 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all placeholder:text-text-soft/30 font-body"
                />
              </div>
              <div className="space-y-3">
                <label className="text-primary font-bold text-sm tracking-widest uppercase ml-2 opacity-70">{t('email_label')}</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full px-6 py-4 rounded-2xl border border-primary/10 bg-white/60 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all placeholder:text-text-soft/30 font-body"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-primary font-bold text-sm tracking-widest uppercase ml-2 opacity-70">{t('message_label')}</label>
              <textarea 
                name="message"
                rows={5} 
                required
                placeholder={lng === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                className="w-full px-6 py-4 rounded-2xl border border-primary/10 bg-white/60 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all placeholder:text-text-soft/30 font-body"
              ></textarea>
            </div>
            
            <motion.button 
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full font-bold py-5 rounded-2xl shadow-xl transition-all disabled:opacity-50 relative overflow-hidden group ${
                status === 'success' ? 'bg-green-600 text-white' : 
                status === 'error' ? 'bg-red-600 text-white' : 
                'bg-primary text-white hover:bg-primary/95'
              }`}
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{lng === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
                  </>
                ) : status === 'success' ? (
                  <span>{t('success_msg')}</span>
                ) : status === 'error' ? (
                  <span>{t('error_msg')}</span>
                ) : (
                  <span>{t('submit_button')}</span>
                )}
              </div>
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
