import type { Meta, StoryObj } from '@storybook/react'

import { TabContent, type TabType } from '@meetgram/ui-kit'

import { TabsView } from './TabsView'

const meta = {
  component: TabsView,
  tags: ['autodocs'],
  title: 'ui/TabsView',
} satisfies Meta<typeof TabsView>

export default meta
type Story = StoryObj<typeof meta>

const mockTabs: TabType[] = [
  { text: 'Uploaded photos', value: 'uploadedPhotos' },
  { text: 'Payments', value: 'payments' },
  { text: 'Followers', value: 'followers' },
  { text: 'Following', value: 'following' },
]

export const Default: Story = {
  args: {
    children: (
      <>
        {mockTabs.map(tab => (
          <TabContent key={tab.value} value={tab.value}>
            {tab.text}
          </TabContent>
        ))}
      </>
    ),
    tabs: mockTabs,
  },
}
