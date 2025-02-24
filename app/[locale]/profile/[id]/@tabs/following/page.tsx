import { ProfileTabValues } from '@/src/widgets/tabs'
import { TabContent } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <TabContent value={ProfileTabValues.following}>
      <div>Здесь будут подписки</div>
    </TabContent>
  )
}
