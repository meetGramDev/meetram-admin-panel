'use client'
import { useState } from 'react'

import { usePathname, useRouter } from '@/src/shared/routes'
import { Option, Select } from '@meetgram/ui-kit'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'

import { type Locale, i18nConfig } from './config'

export function LocaleSwitcher() {
  const currentLocale = useLocale()
  const [selectedLang] = useState<Locale>(currentLocale as Locale)

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useParams()

  return (
    <Select
      value={selectedLang}
      onValueChange={(value: Locale) =>
        replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { params, pathname },
          { locale: value, scroll: false }
        )
      }
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
