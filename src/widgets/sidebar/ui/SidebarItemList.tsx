'use client'
import { useLocale } from '@/src/app/i18n'
import { sidebarItems } from '@/src/widgets/sidebar/const/sidebar-items'
import { SidebarItem } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'
import { usePathname } from 'next/navigation'

export const SidebarItemList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const currentPathname = usePathname()
  const locale = useLocale()

  return (
    <>
      {sidebarItems.map(item => (
        <SidebarItem
          isMobile={isMobile}
          key={item.name}
          item={item}
          isActiveLink={currentPathname === `/${locale}/${item.hrefPath}`}
          className={cn(
            'font-semibold',
            currentPathname !== `/${locale}/${item.hrefPath}` && 'text-light-100'
          )}
        />
      ))}
    </>
  )
}
