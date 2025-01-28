import { DesktopSidebar } from '@meetgram/ui-kit'
import dynamic from 'next/dynamic'

import { sidebarItems } from '../const/sidebar-items'

const SidebarItem = dynamic(() => import('@meetgram/ui-kit').then(mod => mod.SidebarItem), {
  ssr: false,
})

export const Sidebar = () => {
  return (
    <DesktopSidebar className={'w-40'}>
      {sidebarItems.map(item => (
        <SidebarItem key={item.name} item={item} className={'font-semibold text-light-100'} />
      ))}
    </DesktopSidebar>
  )
}
