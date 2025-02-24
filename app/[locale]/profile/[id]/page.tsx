import { type Locale, getDictionary } from '@/src/app_layer/i18n'
import { getUserProfileRSC } from '@/src/entities/users'
import { BackButton } from '@/src/shared/ui'
import { Photo } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'
import Image from 'next/image'

export default async function UserId({ params }: { params: { id: string; locale: Locale } }) {
  const { id, locale } = params
  const dict = await getDictionary(locale)
  const { data, error } = await getUserProfileRSC(+id)
  let content

  if (error) {
    content = <p className={'mt-8 text-center text-h1 text-danger-500'}>{error}</p>
  }

  if (data) {
    content = (
      <div className={'mt-6 text-regular16'}>
        <div className={'mb-5 flex gap-6 border border-white'}>
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
        <div
          className={
            'grid grid-cols-[120px_120px] gap-y-2 border border-white sm:grid-cols-[180px_180px]'
          }
        >
          <p className={'text-light-900'}>UserID</p>
          <p className={'text-light-900'}>Profile Creation Date</p>
          <p className={'text-light-100'}>{data.id}</p>
          <p className={'text-light-100'}>{dateFormatting(data.createdAt, { locale })}</p>
        </div>
        <div></div>
      </div>
    )
  }

  return (
    <div>
      <BackButton>
        {/* @ts-ignore */}
        <span>{`${dict['buttons']['Back']}`}</span>
      </BackButton>
      {content}
    </div>
  )
}
