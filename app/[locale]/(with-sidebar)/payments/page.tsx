import { Suspense } from 'react'

import { PaymentsList } from '@/src/pages_layer/payments-list'

export default function PaymetsPage() {
  return (
    <Suspense>
      <PaymentsList />
    </Suspense>
  )
}
