import { ProfileTabValues } from '@/src/widgets/tabs'
import { TabContent } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <TabContent value={ProfileTabValues.payments}>
      <div>Здесь будут платежи</div>
    </TabContent>
  )
}
