import type { PropsWithChildren } from 'react'

import { MainContent } from '@/src/widgets/layout'

export default async function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainContent>{children}</MainContent>
    </>
  )
}
