import { type PropsWithChildren } from 'react'

import { MainContent } from '@/src/widgets/layout'
import { Sidebar } from '@/src/widgets/sidebar'

export default function SidebarLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </>
  )
}
