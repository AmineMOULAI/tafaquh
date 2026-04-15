'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function LanguageHandler() {
  const params = useParams()

  useEffect(() => {
    if (!params?.lang) return;
    const lang = params.lang as string
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [params?.lang])

  return null
}
