'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type Locale, i18nConfig } from './config'

/**
 * Временный
 */
export function LocaleSwitcher() {
  const pathname = usePathname()
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) {
      return '/'
    }
    const segments = pathname.split('/')

    segments[1] = locale

    return segments.join('/')
  }

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18nConfig.locales.map(locale => {
          return (
            <li key={locale}>
              <Link href={redirectedPathname(locale)}>{locale}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
