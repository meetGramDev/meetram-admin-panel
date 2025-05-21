import { defineRouting } from 'next-intl/routing'

export const i18nConfig = defineRouting({
  defaultLocale: 'en',
  localeCookie: {
    name: 'lang',
  },
  locales: ['en', 'ru', 'be', 'es', 'uk'],
})

export type Locale = (typeof i18nConfig)['locales'][number]
