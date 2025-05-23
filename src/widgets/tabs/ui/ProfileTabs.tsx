'use client'
import type { PropsWithChildren } from 'react'

import { TabsView } from '@/src/shared/ui'
import { type TabType } from '@meetgram/ui-kit'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ProfileTabValues } from '../const/profile-tabs'

export const ProfileTabs = ({
  children,
  className,
}: { className?: string } & PropsWithChildren) => {
  const t = useTranslations('user-profile')
  const activeTab = useSelectedLayoutSegment()
  const tabs: TabType[] = [
    { text: t('Uploaded Photos'), value: ProfileTabValues.posts },
    { text: t('Payments'), value: ProfileTabValues.payments },
    { text: t('Followers'), value: ProfileTabValues.followers },
    { text: t('Following'), value: ProfileTabValues.following },
  ]

  return (
    <TabsView contentClassname={className} tabs={tabs} defaultTab={activeTab ?? tabs[0].value}>
      {children}
    </TabsView>
  )
}
