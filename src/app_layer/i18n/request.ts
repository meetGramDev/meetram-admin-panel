import { getRequestConfig } from 'next-intl/server'

import { type Locale, i18nConfig } from './config'

/**
 * Используется для конфигурации серверного кода, в т.ч Server Components, Server Actions & friends
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !i18nConfig.locales.includes(locale as Locale)) {
    locale = i18nConfig.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../../dictionaries/${locale}.json`)).default,
  }
})
