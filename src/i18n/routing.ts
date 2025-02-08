import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Used when no locale matches
  defaultLocale: 'en',

  // A list of all locales that are supported
  locales: ['en', 'be', 'es', 'ru', 'uk'],
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
