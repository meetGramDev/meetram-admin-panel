'use client'
import { Breakpoints } from '@/src/shared/const/breakpoints'
import { useMediaQuery } from '@/src/shared/lib'
import { DesktopSidebar, MobileSidebar } from '@meetgram/ui-kit'

import { SidebarItemList } from './SidebarItemList'

export const Sidebar = () => {
  const { isMatches: isLargeScreen, windowWidth } = useMediaQuery(
    `(min-width: ${Breakpoints.largeScreen})`
  )

  return (
    <>
      {windowWidth !== null ? (
        <>
          {isLargeScreen ? (
            <DesktopSidebar>
              <SidebarItemList />
            </DesktopSidebar>
          ) : (
            <MobileSidebar containerClassName={'bg-dark-900'}>
              <SidebarItemList isMobile={!isLargeScreen} />
            </MobileSidebar>
          )}
        </>
      ) : (
        /* TODO: сделать красивый UI (скелетон или loader) */
        <div></div>
      )}
    </>
  )
}
