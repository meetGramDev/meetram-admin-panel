'use client'
import { useLocale } from '@/src/app/i18n'
import { DesktopSidebar, SidebarItem } from '@meetgram/ui-kit'
import { usePathname } from 'next/navigation'

import { sidebarItems } from '../const/sidebar-items'

export const Sidebar = () => {
  const currentPathname = usePathname()
  const locale = useLocale()

  return (
    <DesktopSidebar>
      {sidebarItems.map(item => (
        <SidebarItem
          key={item.name}
          item={item}
          isActiveLink={currentPathname === `/${locale}/${item.hrefPath}`}
          className={'font-semibold text-light-100'}
        />
      ))}
    </DesktopSidebar>
  )
}
