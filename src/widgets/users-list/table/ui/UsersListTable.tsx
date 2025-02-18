'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { useLocale } from '@/src/app_layer/i18n'
import { DeleteUserMenuItem, type MutateUserType } from '@/src/entities/users'
import { TableActionsMenu } from '@/src/features/table-actions-menu'
import { BannedIcon } from '@/src/shared/assets/icons'
import { PROFILE } from '@/src/shared/routes'
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'
import Link from 'next/link'

import { useUsersListTable } from '../lib/useUsersListTable'
import { paginationPageSize } from '../model/pagination-config'
import { TableSkeleton } from './TableSkeleton'

export type UsersListTableProps = {
  disabled?: boolean
  /**
   * Triggers on user deletion
   */
  onDelete?: (user: MutateUserType) => void
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

export const UsersListTable = ({ disabled, onDelete, ...props }: UsersListTableProps) => {
  const locale = useLocale()
  const { data, error, handleItemsPerPageChange, handleOnPageChange, loading, refetch } =
    useUsersListTable(props)

  if (loading) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <div className={'mt-8 flex flex-col items-center justify-center gap-3'}>
        <p className={'text-center text-h1 text-danger-500 lg:text-large'}>{error.message}</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    )
  }

  if (data?.getUsers.users.length === 0) {
    return <p className={'text-center text-h1 lg:text-large'}>Nothing found</p>
  }

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
                <TableCell>
                  <Button
                    as={Link}
                    variant={'link'}
                    className={'text-white'}
                    href={{ pathname: `/${PROFILE}/${user.id}`, query: { from: 'users' } }}
                  >
                    {user.userName}
                  </Button>
                </TableCell>
                <TableCell>{dateFormatting(user.createdAt, { locale })}</TableCell>
                <TableCell className={'max-w-[100px] text-end'}>
                  <TableActionsMenu disabled={disabled}>
                    <DeleteUserMenuItem onClick={() => onDelete?.(user)} />
                  </TableActionsMenu>
                </TableCell>
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
