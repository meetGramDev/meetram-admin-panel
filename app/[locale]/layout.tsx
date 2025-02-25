import type { Metadata } from 'next'

import { type ReactNode, Suspense } from 'react'

import { type Locale, i18nConfig } from '@/src/app_layer/i18n'
import { ApolloWrapper } from '@/src/app_layer/providers'
import { Header } from '@/src/widgets/header'
import { ProgressBar } from '@/src/widgets/progress-bar'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import '../../src/app_layer/styles/globals.scss'
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
  return i18nConfig.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode
  params: { locale: Locale }
}>) {
  // Ensure that the incoming `locale` is valid
  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Providing all dictionaries (aka messages) to the client side
  const dictionaries = await getMessages()

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={dictionaries}>
        <ApolloWrapper>
          <body className={`${interFont.variable} relative antialiased`}>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <Header />
            {children}
          </body>
        </ApolloWrapper>
      </NextIntlClientProvider>
    </html>
  )
}
