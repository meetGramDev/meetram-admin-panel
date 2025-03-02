import type { Metadata } from 'next'

import { type ReactNode, Suspense } from 'react'

import { type Locale, LocaleProvider, i18nConfig } from '@/src/app_layer/i18n'
import { ApolloWrapper } from '@/src/app_layer/providers'
import { Header } from '@/src/widgets/header'
import { ProgressBar } from '@/src/widgets/progress-bar'
import { Inter } from 'next/font/google'

import '@/src/app_layer/styles/globals.scss'
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
        <ApolloWrapper>
          <body className={`${interFont.variable} relative antialiased`}>
            <Suspense fallback={null}>
              <ProgressBar />
            </Suspense>
            <Header />
            {children}
          </body>
        </ApolloWrapper>
      </LocaleProvider>
    </html>
  )
}
