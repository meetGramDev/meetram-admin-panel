import { Suspense } from 'react'

import { UsersList } from '@/src/pages_layer/users-list'

export default function Page() {
  return (
    <Suspense>
      <UsersList />
    </Suspense>
  )
}
