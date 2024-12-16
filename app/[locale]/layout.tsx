import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { Locale, i18nConfig } from '@/src/app/i18n'
import { Inter } from 'next/font/google'

import '@/src/app/styles/globals.scss'

const interFont = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter-sans',
})

export const metadata: Metadata = {
  description: 'Meetgram Admin Panel',
  title: 'Admin Meetgram',
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
      <body className={`${interFont.variable} antialiased`}>{children}</body>
    </html>
  )
}
