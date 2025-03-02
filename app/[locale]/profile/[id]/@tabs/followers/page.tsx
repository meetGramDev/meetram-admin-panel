import { Suspense } from 'react'

import { UserFollowers } from '@/src/pages_layer/user/user-followers'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { TabContent } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <TabContent value={ProfileTabValues.followers}>
      <Suspense>
        <UserFollowers />
      </Suspense>
    </TabContent>
  )
}
