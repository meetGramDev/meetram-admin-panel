import type { ComponentProps, ReactElement } from 'react'

import { Button, Dialog } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'

type Props = {
  buttonsClassname?: string
  message: ReactElement | string
  onConfirm: (isConfirm: boolean) => void
  rootClassname?: string
} & ComponentProps<typeof Dialog>

export const ConfirmDialog = ({
  buttonsClassname,
  className,
  message,
  onConfirm,
  rootClassname,
  ...props
}: Props) => {
  return (
    <Dialog {...props}>
      <div className={cn('px-6 py-7', rootClassname)}>
        <p
          className={
            'mb-8 max-h-60 w-80 overflow-auto text-regular16 font-normal md:mb-12 md:w-[416px]'
          }
        >
          {message}
        </p>
        <div className={cn('flex flex-wrap gap-6 md:justify-end', buttonsClassname)}>
          <Button onClick={() => onConfirm(true)} variant={'outlined'}>
            Yes
          </Button>
          <Button onClick={() => onConfirm(false)}>No</Button>
        </div>
      </div>
    </Dialog>
  )
}
