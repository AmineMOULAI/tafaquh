import Link from 'next/link'
import { fallbackLng } from '@/i18n/settings'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light text-primary p-4">
      <h1 className="text-6xl font-bold font-amiri mb-4">404</h1>
      <p className="text-xl mb-8 opacity-70">Page non trouvée / Page not found</p>
      <Link 
        href={`/${fallbackLng}`}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Retour à l&apos;accueil / Back to Home
      </Link>
    </div>
  )
}
