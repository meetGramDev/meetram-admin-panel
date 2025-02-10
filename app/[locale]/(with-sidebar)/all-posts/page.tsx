import { type Locale, getDictionary } from '@/src/app_layer/i18n'
import { AllPosts } from '@/src/pages_layer/all-posts'

export default async function Index({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <AllPosts dict={dict} />
}
