'use client'
import { PropsWithChildren, createContext, useContext } from 'react'

import { Locale } from './config'

const LocaleContext = createContext<Locale | null>(null)

function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <LocaleProvider />')
  }

  return context
}

type LocaleProviderProps = {
  langParam: Locale
} & PropsWithChildren
function LocaleProvider({ children, langParam }: LocaleProviderProps) {
  return <LocaleContext.Provider value={langParam}>{children}</LocaleContext.Provider>
}

export { LocaleProvider, useLocale }
