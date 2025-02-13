export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'ru', 'be', 'es', 'uk'],
} as const

export type Locale = (typeof i18nConfig)['locales'][number]
