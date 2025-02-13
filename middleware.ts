import { i18nConfig } from '@/src/app/i18n'
import { ALL_POSTS, SIGN_IN } from '@/src/shared/routes'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18nConfig.locales

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale)

  return locale
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const isLogged = req.cookies.get('logged')?.value

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    [
      '/favicon.ico',
      '/file.svg',
      '/globe.svg',
      '/next.svg',
      '/vercel.svg',
      '/window.svg',
      // ... your other files in `public`
    ].includes(pathname)
  ) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url)
    )
  }
  // console.log('isLogged:', isLogged)
  // console.log('pathname:', pathname)
  // console.log('SIGN_IN:', SIGN_IN)

  if (!isLogged && !pathname.includes(SIGN_IN)) {
    const locale = getLocale(req) || i18nConfig.defaultLocale

    return NextResponse.redirect(new URL(`/${locale}/${SIGN_IN}`, req.url))
  }

  if (isLogged && pathname.includes(SIGN_IN)) {
    return NextResponse.redirect(new URL(ALL_POSTS, req.url)) //(new URL(USERS_LIST, req.url))
  }

  return NextResponse.next()
}

export const config = {
  // Skip all internal paths (_next)
  matcher: ['/((?!_next).*)', '/:locale(sign-in)'],
  // Optional: only run on root (/) URL
  // '/'
}
