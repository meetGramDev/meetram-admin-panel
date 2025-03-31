'use client'
import type { PropsWithChildren } from 'react'

import { BackIcon } from '@/src/shared/assets/icons'
import { useRouter } from '@/src/shared/routes'
import { Button } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'

type Props = {
  className?: string
  whereTo?: string
} & PropsWithChildren
export const BackButton = ({ children, className, whereTo }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant={'text'}
      className={cn('flex gap-3 text-white', className)}
      onClick={() => (whereTo ? router.push(whereTo) : router.back())}
    >
      <BackIcon />
      {children}
    </Button>
  )
}
