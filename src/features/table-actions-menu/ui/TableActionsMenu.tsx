import type { ComponentProps } from 'react'

import { MoreHorizontalIcon } from '@/src/shared/assets/icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/src/shared/ui'
import { Button } from '@meetgram/ui-kit'

import s from './actions-menu.module.scss'

type Props = {
  disabled?: boolean
} & ComponentProps<typeof DropdownMenu>

export const TableActionsMenu = ({ children, disabled, ...props }: Props) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        disabled={disabled}
        className={'data-[state="open"]:text-accent-700'}
        asChild
      >
        <Button variant={'text'} disabled={disabled} className={s._button}>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'p-0'} side={'left'} align={'start'} alignOffset={24}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
