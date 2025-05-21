'use client'
import { type ReactNode, useState } from 'react'

import { TabSwitcher, type TabType } from '@meetgram/ui-kit'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
  className?: string
  contentClassname?: string
  defaultTab?: string
  tabs: TabType[]
}

export const TabsView = ({ children, className, contentClassname, defaultTab, tabs }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0].value)
  const { push } = useRouter()
  const pathnames = usePathname().split('/')

  const handleOnValueChange = (value: string) => {
    setActiveTab(value)

    push(
      pathnames
        .slice(0, pathnames.length - 1)
        .concat(value)
        .join('/')
    )
  }

  return (
    <TabSwitcher
      className={className}
      onValueChange={handleOnValueChange}
      tabs={tabs}
      value={activeTab}
    >
      <div className={contentClassname}>{children}</div>
    </TabSwitcher>
  )
}
