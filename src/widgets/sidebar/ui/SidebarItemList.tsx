'use client'
import { usePathname } from '@/src/shared/routes'
import { sidebarItems } from '@/src/widgets/sidebar/const/sidebar-items'
import { SidebarItem } from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'
import { useTranslations } from 'next-intl'

export const SidebarItemList = ({ isMobile = false }: { isMobile?: boolean }) => {
  const currentPathname = usePathname()
  const t = useTranslations('sidebar-items')

  return (
    <>
      {sidebarItems.map(item => {
        const newItem = { ...item, name: t(item.name as any) }

        /* TODO: тут пока что стоит заглушка в типе. Нужно будет поправить */
        return (
          <SidebarItem
            isMobile={isMobile}
            key={item.name}
            item={newItem}
            isActiveLink={currentPathname === `/${item.hrefPath}`}
            className={cn(
              'font-semibold',
              currentPathname !== `/${item.hrefPath}` && 'text-light-100'
            )}
          />
        )
      })}
    </>
  )
}
