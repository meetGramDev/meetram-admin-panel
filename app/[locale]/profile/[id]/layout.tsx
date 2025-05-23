import type { ReactNode } from 'react'

import { type Locale } from '@/src/app_layer/i18n'
import { getUserProfileRSC } from '@/src/entities/user/api'
import { USERS_LIST } from '@/src/shared/routes'
import { BackButton } from '@/src/shared/ui'
import { Photo } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils/functions'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export default async function UserLayout({
  params,
  tabs,
}: {
  params: { id: string; locale: Locale }
  tabs: ReactNode
}) {
  const { id, locale } = params
  const t = await getTranslations({ locale })

  const { data, error } = await getUserProfileRSC(+id)
  let content

  if (error) {
    content = <p className={'mt-8 text-center text-h1 text-danger-500'}>{error}</p>
  }

  if (data) {
    content = (
      <div className={'mt-6 text-regular16'}>
        <div className={'mb-5 flex gap-6'}>
          <Photo
            containerClassname={'basis-[80px] self-center'}
            iconContainerClassname={'min-w-[80px] h-[80px]'}
            iconClassname={'w-7'}
            component={Image}
            {...(data.profile.avatars?.length && data.profile.avatars[0].url
              ? {
                  alt: `${data.userName} avatar`,

                  src: data.profile.avatars[0].url,
                  type: 'fill',
                }
              : { alt: 'blank avatar', src: '', type: 'empty' })}
            width={80}
            height={80}
          />

          <div className={'grid flex-1 grid-rows-2'}>
            <p className={'flex gap-1 self-end font-semibold'}>
              <span>{data.profile.firstName ?? 'No name'}</span>
              <span>{data.profile.lastName ?? ''}</span>
            </p>
            <p className={'underline'}>{data.userName}</p>
          </div>
        </div>
        <div className={'grid grid-cols-[120px_120px] gap-y-2 sm:grid-cols-[180px_180px]'}>
          <p className={'text-light-900'}>{t('user-profile.User ID')}</p>
          <p className={'text-light-900'}>{t('user-profile.Profile Creation Date')}</p>
          <p className={'text-light-100'}>{data.id}</p>
          <p className={'text-light-100'}>{dateFormatting(data.createdAt, { locale })}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <BackButton whereTo={'/' + USERS_LIST}>
          <span>{t('buttons.Back')}</span>
        </BackButton>
        {content}
      </div>
      <div className={'mt-9'}>{tabs}</div>
    </>
  )
}
