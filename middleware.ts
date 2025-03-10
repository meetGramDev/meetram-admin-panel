import { i18nConfig } from '@/src/app_layer/i18n'
import { SIGN_IN, USERS_LIST } from '@/src/shared/routes'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

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

  // Matches all paths that start with a locale like '/en'
  const pathnameHasLocale = new RegExp(`^/(${i18nConfig.locales.join('|')})(/.*)?$`).test(pathname)

  if (!pathnameHasLocale) {
    const i18nMiddleware = createMiddleware(i18nConfig)

    return i18nMiddleware(req)
  }

  if (!isLogged && !pathname.includes(SIGN_IN)) {
    return NextResponse.redirect(new URL(SIGN_IN, req.url))
  }

  if (isLogged && pathname.includes(SIGN_IN)) {
    return NextResponse.redirect(new URL(USERS_LIST, req.url))
  }

  return NextResponse.next()
}

export const config = {
  // Skip all internal paths (_next)
  matcher: ['/((?!_next).*)', '/:locale(sign-in)'],
  // Optional: only run on root (/) URL
  // '/'
}
