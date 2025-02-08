/*import { type Locale, getDictionary } from '@/src/app/i18n'
import Image from 'next/image'*/
import { LocaleSwitcher } from '@/src/app/i18n'
import { Link } from '@/src/i18n/routing'
import { useTranslations } from 'next-intl'
export default function Home(/*{ params }: { params: Promise<{ locale: Locale }> }*/) {
  /*const { locale } = await params
  const dict = await getDictionary(locale)*/
  const prom = new Promise<string | undefined>((resolve, reject) => {
    resolve('ru')
  })

  const t = useTranslations('HomePage')

  return (
    <div
      className={
        'grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-inter-sans)] sm:p-20'
      }
    >
      <h1>{t('title')}</h1>
      <Link href={'/about'}>{t('about')}</Link>
    </div>
  )
}
