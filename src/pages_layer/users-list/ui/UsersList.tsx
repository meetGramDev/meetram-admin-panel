'use client'
import { NetworkStatus } from '@apollo/client'
import { Loader } from '@meetgram/ui-kit'

import { useGetUsersListQuery, useGetUsersListSuspenseQuery } from '../api/users.generated'

export const UsersList = () => {
  const { error, loading, networkStatus } = useGetUsersListQuery()

  if (loading) {
    return <Loader />
  }

  if (error && networkStatus === NetworkStatus.error) {
    return <div>{error.message}</div>
  }

  return <div>Users</div>
}
