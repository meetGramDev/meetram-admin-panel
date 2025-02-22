'use client'
import type { PropsWithChildren } from 'react'

import { BackIcon } from '@/src/shared/assets/icons'
import { Button } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
} & PropsWithChildren
export const BackButton = ({ children, className }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant={'text'}
      className={cn('flex gap-3 text-white', className)}
      onClick={() => router.back()}
    >
      <BackIcon />
      {children}
    </Button>
  )
}
