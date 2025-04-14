import type { SVGProps } from 'react'

import { DropdownMenuItem } from '@/src/shared/ui'

type Props = {
  icon: SVGProps<SVGSVGElement>
  innerText?: string
  onClick?: () => void
}

export const UserMenuItem = ({ icon, innerText, onClick }: Props) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={'flex items-center justify-start gap-3 p-3 text-regular14'}
    >
      <>{icon}</>
      {innerText}
    </DropdownMenuItem>
  )
}
