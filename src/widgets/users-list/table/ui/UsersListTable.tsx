'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { useEffect } from 'react'

import { useLocale } from '@/src/app_layer/i18n'
import { BannedIcon } from '@/src/shared/assets/icons'
import {
  Button,
  Loader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'

import { useGetUsersListQuery } from '../api/users.generated'

const paginationPageSize = [5, 10, 15, 20]

type Props = {
  /**
   * Send error message whether it occurred
   * @param error message
   */
  onError?: (error: string) => void
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

export const UsersListTable = ({ onError, searchQuery, statusFilter }: Props) => {
  const { data, error, loading, refetch } = useGetUsersListQuery({
    variables: {
      searchTerm: searchQuery,
      // сервер ожидает строковое значение из енамки,
      // типизация верная, но без as ts ругается.
      statusFilter: statusFilter as UserBlockStatus | undefined,
    },
  })
  const locale = useLocale()

  useEffect(() => {
    if (!onError) {
      return
    }

    if (error) {
      onError(error.message)
    } else {
      onError('')
    }
  }, [error, onError])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className={'mt-8 flex flex-col items-center justify-center gap-3'}>
        <p className={'text-center text-h1 text-danger-500 lg:text-large'}>{error.message}</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    )
  }

  const handleOnPageChange = (page: number) => {}

  const handleItemsPerPageChange = (itemsPerPage: number) => {}

  return (
    <>
      <div className={'mb-9'}>
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
                <TableCell className={'flex items-center gap-3'}>
                  {user.userBan?.createdAt && <BannedIcon className={'text-light-100'} size={24} />}
                  <span>{user.id}</span>
                </TableCell>
                <TableCell>
                  {user.profile.firstName || user.profile.lastName
                    ? `${user.profile.firstName || ''} ${user.profile.lastName || ''}`
                    : '—'}
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{dateFormatting(user.createdAt, { locale })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data?.getUsers.pagination && (
        <div className={'w-full md:w-1/2'}>
          <Pagination
            currentPage={data.getUsers.pagination.page}
            pageCount={data.getUsers.pagination.pagesCount}
            onPageChange={handleOnPageChange}
            options={paginationPageSize}
            onPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </>
  )
}
