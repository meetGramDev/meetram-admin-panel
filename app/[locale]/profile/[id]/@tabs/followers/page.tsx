import { ProfileTabValues } from '@/src/widgets/tabs'
import { TabContent } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <TabContent value={ProfileTabValues.followers}>
      <div>Здесь будут подписчики</div>
    </TabContent>
  )
}
