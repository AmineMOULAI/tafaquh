import { NextResponse, NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './src/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // Exclude API routes, Next.js internal static assets, public audio, images, and any file with an extension
  matcher: [
    '/((?!api|_next/static|_next/image|audio|images|assets|favicon.ico|sw.js|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
}

export function middleware(req: NextRequest) {
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  const pathname = req.nextUrl.pathname

  // Double check: if requesting audio, images, or static file, let Next.js serve it directly
  if (
    pathname.startsWith('/audio/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to localized path if there is no locale
  return NextResponse.redirect(
    new URL(
      `/${lng}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      req.url
    )
  )
}
