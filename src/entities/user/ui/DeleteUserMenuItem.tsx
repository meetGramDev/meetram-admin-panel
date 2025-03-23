import { DeleteUserIcon } from '@/src/shared/assets/icons'
import { DropdownMenuItem } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

type Props = {
  innerText?: string
  onClick?: () => void
}

export const DeleteUserMenuItem = ({ innerText, onClick }: Props) => {
  const t = useTranslations('dialogs.delete')

  return (
    <DropdownMenuItem
      onClick={onClick}
      className={'flex items-center justify-start gap-3 p-3 text-regular14'}
    >
      <DeleteUserIcon size={24} />
      {innerText || t('Delete user')}
    </DropdownMenuItem>
  )
}
