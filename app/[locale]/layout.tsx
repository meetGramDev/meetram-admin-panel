import type { Metadata } from 'next'

import { type ReactNode } from 'react'

import { type Locale, LocaleProvider, i18nConfig } from '@/src/app/i18n'
import { Header } from '@/src/widgets/header'
import { Inter } from 'next/font/google'

import '@/src/app/styles/globals.scss'
import '@meetgram/ui-kit/styles.css'

const interFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter-sans',
})

export const metadata: Metadata = {
  description: 'Meetgram Admin Panel',
  title: 'Super Admin Meetgram',
}

export async function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const lang = (await params).locale

  return (
    <html lang={lang}>
      <LocaleProvider langParam={lang}>
        <body className={`${interFont.variable} relative antialiased`}>
          <Header />
          {children}
        </body>
      </LocaleProvider>
    </html>
  )
}
