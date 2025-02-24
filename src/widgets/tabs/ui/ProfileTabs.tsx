'use client'
import type { PropsWithChildren } from 'react'

import { TabsView } from '@/src/shared/ui'
import { type TabType } from '@meetgram/ui-kit'
import { useSelectedLayoutSegment } from 'next/navigation'

import { ProfileTabValues } from '../const/profile-tabs'

const tabs: TabType[] = [
  { text: 'Uploaded photos', value: ProfileTabValues.posts },
  { text: 'Payments', value: ProfileTabValues.payments },
  { text: 'Followers', value: ProfileTabValues.followers },
  { text: 'Following', value: ProfileTabValues.following },
]

export const ProfileTabs = ({
  children,
  className,
}: { className?: string } & PropsWithChildren) => {
  const activeTab = useSelectedLayoutSegment()

  return (
    <TabsView contentClassname={className} tabs={tabs} defaultTab={activeTab ?? tabs[0].value}>
      {children}
    </TabsView>
  )
}
