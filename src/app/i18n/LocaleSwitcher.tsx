'use client'
import { useState } from 'react'

import { Option, Select } from '@meetgram/ui-kit'
import { usePathname, useRouter } from 'next/navigation'

import { useLocale } from './LocaleProvider'
import { type Locale, i18nConfig } from './config'

export function LocaleSwitcher() {
  const currentLocale = useLocale()
  const [selectedLang] = useState<Locale>(currentLocale)

  const router = useRouter()
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
    <Select
      value={selectedLang}
      onValueChange={(value: Locale) => router.push(redirectedPathname(value))}
      placeholder={<div className={'flex gap-4'}>{currentLocale}</div>}
    >
      {i18nConfig.locales.map(locale => {
        return (
          <Option key={locale} value={locale}>
            <div className={'flex gap-4'}>{locale}</div>
          </Option>
        )
      })}
    </Select>
  )
}
