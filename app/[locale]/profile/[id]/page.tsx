import { type Locale, getDictionary } from '@/src/app_layer/i18n'
import { BackButton } from '@/src/shared/ui'

export default async function UserId({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>
}) {
  const { id, locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div>
      <BackButton>
        {/* @ts-ignore */}
        <span>{`${dict['buttons']['Back']}`}</span>
      </BackButton>
      <div className={'text-h1'}>
        {/* @ts-ignore */}
        <p>{dict['profile']["User's profile will be here!!"]}</p>
        <p>ID: {id}</p>
      </div>
    </div>
  )
}
