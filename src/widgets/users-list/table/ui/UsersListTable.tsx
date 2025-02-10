'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { useLocale } from '@/src/app_layer/i18n'
import { NetworkStatus } from '@apollo/client'
import { Loader, Table, TableBody, TableCell, TableHeader, TableRow } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'

import { useGetUsersListQuery } from '../api/users.generated'

type Props = {
  /**
   * Search by username
   */
  searchQuery?: string
  /**
   * Filter by user status
   * @enum {UserBlockStatus}
   */
  statusFilter?: `${UserBlockStatus}`
}

export const UsersListTable = ({ searchQuery, statusFilter }: Props) => {
  const { data, error, loading, networkStatus } = useGetUsersListQuery({
    variables: {
      searchTerm: searchQuery,
      // сервер ожидает строковое значение из енамки,
      // типизация верная, но без as ts ругается.
      statusFilter: statusFilter as UserBlockStatus | undefined,
    },
  })
  const locale = useLocale()

  if (loading) {
    return <Loader />
  }

  if (error && networkStatus === NetworkStatus.error) {
    return <div>{error.message}</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Profile link</TableCell>
          <TableCell>Date created</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.getUsers.users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{`${user.profile.firstName || ''} ${user.profile.lastName || ''}`}</TableCell>
            <TableCell>{user.userName}</TableCell>
            <TableCell>{dateFormatting(user.createdAt, { locale })}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
