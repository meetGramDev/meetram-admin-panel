import { UserFollowing } from '@/src/pages_layer/user-profile/user-following'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { TabContent } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <TabContent value={ProfileTabValues.following}>
      <div>
        <UserFollowing />
      </div>
    </TabContent>
  )
}
