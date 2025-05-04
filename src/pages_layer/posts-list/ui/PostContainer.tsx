import type { MutateUserType } from '@/src/entities/user'
import type { Post } from '@/src/shared/api'

import { useState } from 'react'

import { BannedIcon } from '@/src/shared/assets/icons'
import imgPlaceholder from '@/src/shared/assets/img/no-image-placeholder.webp'
import { ConfirmBlock } from '@/src/shared/ui'
import { ButtonIcon, ExpandableText, ImageCarousel, type ImageType, Photo } from '@meetgram/ui-kit'
import { getTimeAgo } from '@meetgram/utils'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { useUserBlockMutation } from '../../users-list/lib/useUserBlockMutation'

export const PostContainer = ({ locale, post }: { locale: string; post: Post }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedUser, setSelectedUser] = useState<MutateUserType>({})

  const onToggleText = () => {
    setIsExpanded(!isExpanded)
  }

  const [banReason, setBanReason] = useState('')

  const t = useTranslations()

  const { blockLoading, handleConfirmUserBlock, openBlock, setOpenBlock } = useUserBlockMutation({
    banReason: banReason,
    selectedUser: selectedUser,
  })

  const images =
    post?.images?.map(
      ({ createdAt, fileSize, height, id, url, width }) =>
        ({
          createdAt,
          fileSize,
          height,
          uploadId: id,
          url,
          width,
        }) as {
          createdAt: string
          fileSize: number
          height: number
          uploadId: number
          url: string
          width: number
        }
    ) ?? []

  return (
    <>
      <div className={'no-scrollbar max-h-[440px] overflow-y-auto'}>
        <ImageCarousel
          images={images}
          className={'max-h-[300px] max-w-[300px]'}
          contentClassname={'max-h-[300px] max-w-[300px]'}
        />

        <div className={'mt-[12px] flex items-center'}>
          <Photo
            alt={'user-avatar'}
            src={post?.postOwner?.avatars?.[0]?.url ?? imgPlaceholder.src}
            variant={'round'}
            height={36}
            width={36}
          />

          <h2
            className={'ml-[12px] flex items-center justify-center text-[16px] font-bold leading-6'}
          >
            {post.postOwner.userName}
          </h2>
          <ButtonIcon
            className={'ml-auto cursor-pointer'}
            onClick={() => {
              setSelectedUser({
                id: post.postOwner.id,
                userBan: { createdAt: new Date(), reason: banReason },
                userName: post.postOwner.userName,
              })
              setOpenBlock(true)
            }}
          >
            <BannedIcon size={36} />
          </ButtonIcon>
        </div>
        <div className={'inline'}>
          <time
            className={'mb-[3px] mt-[12px] text-[12px] leading-4 text-light-900'}
            suppressHydrationWarning
          >
            {getTimeAgo(locale, post.createdAt)}
          </time>
        </div>
        <ExpandableText
          isExpanded={isExpanded}
          message={post.description}
          onExpand={onToggleText}
          showedCount={post.description.length}
          hideCount={70}
          showMoreBtnText={t('text.Show more')}
          hideBtnText={t('text.Hide')}
        />
      </div>
      <ConfirmBlock
        title={t('dialogs.ban.Ban user')}
        open={openBlock}
        onOpenChange={setOpenBlock}
        onConfirm={handleConfirmUserBlock}
        message={
          <span className={'text-regular16 text-white'}>
            {t('dialogs.ban.Are you sure to ban this user')}{' '}
            <span className={'font-bold'}>{selectedUser.userName}</span>?
          </span>
        }
        onChange={setBanReason}
      />
    </>
  )
}
