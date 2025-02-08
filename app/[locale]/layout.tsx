/*import type { Metadata } from 'next'

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
}*/

import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { routing } from '../../src/i18n/routing'

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  /*setRequestLocale(locale)*/
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  console.log('cookies()', cookies())

  /*  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: Locale }>
}>) {*/
  /* const lang = (await params).locale*/

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
  /*(
    <html lang={lang}>
      <LocaleProvider langParam={lang}>
        <body className={`${interFont.variable} relative antialiased`}>
          <Header />
          {children}
        </body>
      </LocaleProvider>
    </html>
  )*/
}
