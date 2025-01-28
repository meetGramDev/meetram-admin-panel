import { LocaleSwitcher } from '@/src/app/i18n'
import { HOME } from '@/src/shared/routes'
import { DesktopHeader } from '@meetgram/ui-kit'
import Link from 'next/link'

export const Header = () => {
  return (
    <DesktopHeader className={'p-4 md:px-[3.75rem]'}>
      <Link href={HOME} className={'text-large font-semibold text-light-100'}>
        Meetgram
        <span className={'text-small font-light'}>
          Super<span className={'font-semibold'}>Admin</span>
        </span>
      </Link>
      <div className={'flex items-center justify-between gap-[2.25rem]'}>
        <LocaleSwitcher />
      </div>
    </DesktopHeader>
  )
}
