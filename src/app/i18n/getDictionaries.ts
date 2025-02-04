import { type Locale } from './config'

const dictionaries = {
  be: () => import('@/dictionaries/be.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  es: () => import('@/dictionaries/es.json').then(module => module.default),
  ru: () => import('@/dictionaries/ru.json').then(module => module.default),
  uk: () => import('@/dictionaries/uk.json').then(module => module.default),
}

// TODO типизация
export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()
