'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions } from './settings'

// Statically import translations to ensure they are available synchronously during hydration and SSR
import ar from '../locales/ar.json'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

const resources = {
  ar: { translation: ar },
  fr: { translation: fr },
  en: { translation: en }
}

const runsOnServerSide = typeof window === 'undefined'

// Initialize i18next
const i18nInstance = i18next
  .use(initReactI18next)

if (!runsOnServerSide) {
  i18nInstance.use(LanguageDetector)
}

i18nInstance.init({
  ...getOptions(),
  resources,
  detection: {
    order: ['path', 'htmlTag', 'cookie', 'navigator'],
  }
})

export function useTranslation(lng: string, ns?: string, options: { keyPrefix?: string } = {}) {
  const ret = useTranslationOrg(ns, { ...options, lng })
  const { i18n } = ret
  
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  // On server, return a fixed T to avoid hydration mismatches
  if (runsOnServerSide) {
    return {
      ...ret,
      t: i18n.getFixedT(lng, ns, options.keyPrefix)
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return
    setActiveLng(i18n.resolvedLanguage)
  }, [activeLng, i18n.resolvedLanguage])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    i18n.changeLanguage(lng)
  }, [lng, i18n])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window === 'undefined') return
    const element = document.documentElement
    element.lang = i18n.language
    element.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return ret
}
