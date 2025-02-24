import type { ReactNode } from 'react'

import { ProfileTabs } from '@/src/widgets/tabs'

export default function TabsLayout({ children }: { children: ReactNode }) {
  return <ProfileTabs className={'pt-9'}>{children}</ProfileTabs>
}
