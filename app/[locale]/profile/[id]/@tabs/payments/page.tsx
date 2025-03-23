import { Suspense } from 'react'

import { UserPayments } from '@/src/pages_layer/user-profile/user-payments'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { TabContent } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <TabContent value={ProfileTabValues.payments}>
      <Suspense>
        <UserPayments />
      </Suspense>
    </TabContent>
  )
}
