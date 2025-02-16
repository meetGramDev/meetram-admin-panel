import { DeleteUserIcon } from '@/src/shared/assets/icons'
import { DropdownMenuItem } from '@/src/shared/ui'

type Props = {
  innerText?: string
  onClick?: () => void
}

export const DeleteUserMenuItem = ({ innerText, onClick }: Props) => {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className={'flex items-center justify-start gap-3 p-3 text-regular14'}
    >
      <DeleteUserIcon size={24} />
      {innerText || 'Delete user'}
    </DropdownMenuItem>
  )
}
