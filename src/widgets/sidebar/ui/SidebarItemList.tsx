'use client'
import { usePathname } from '@/src/shared/routes'
import { sidebarItems } from '@/src/widgets/sidebar/const/sidebar-items'
import { SidebarItem } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'

export const SidebarItemList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const currentPathname = usePathname()

  return (
    <>
      {sidebarItems.map(item => (
        <SidebarItem
          isMobile={isMobile}
          key={item.name}
          item={item}
          isActiveLink={currentPathname === `/${item.hrefPath}`}
          className={cn(
            'font-semibold',
            currentPathname !== `/${item.hrefPath}` && 'text-light-100'
          )}
        />
      ))}
    </>
  )
}
