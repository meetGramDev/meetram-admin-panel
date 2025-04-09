'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { type MutateUserType, UserMenuItem } from '@/src/entities/user'
import { TableActionsMenu } from '@/src/features/table-actions-menu'
import { BannedIcon, DeleteUserIcon } from '@/src/shared/assets/icons'
import { Link, PROFILE } from '@/src/shared/routes'
import { ProfileTabValues } from '@/src/widgets/tabs'
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'
import { useLocale, useTranslations } from 'next-intl'

import { usersListTableHeaders } from '../const/users-list-table-headers'
import { useUsersListTable } from '../lib/useUsersListTable'
import { paginationPageSize } from '../model/pagination-config'
import { TableSkeleton } from './TableSkeleton'

export type UsersListTableProps = {
  disabled?: boolean
  onBlock?: (user: MutateUserType) => void
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

export const UsersListTable = ({ disabled, onBlock, onDelete, ...props }: UsersListTableProps) => {
  const locale = useLocale()
  const t = useTranslations('info-messages')
  const translateTable = useTranslations('user-list-items-table-header')
  const deleteUser = useTranslations('dialogs.delete')
  const banUser = useTranslations('dialogs.ban')
  const {
    data,
    error,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    loading,
    refetch,
    sortBy,
    sortDir,
  } = useUsersListTable(props)

  if (loading) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <div className={'mt-8 flex flex-col items-center justify-center gap-3'}>
        <p className={'text-center text-h1 text-danger-500 lg:text-large'}>{error.message}</p>
        <Button onClick={() => refetch()}>{t('Try again')}</Button>
      </div>
    )
  }

  if (data?.getUsers.users.length === 0) {
    return <p className={'text-center text-h1 lg:text-large'}>{t('Nothing found')}</p>
  }

  return (
    <>
      <div className={'mb-9'}>
        <Table>
          <TableHeader>
            <TableRow className={'has-[:hover]:border-0'}>
              {usersListTableHeaders.map(header => {
                return (
                  <TableHead
                    sort={sortBy === header.key ? sortDir : undefined}
                    onClick={() => handleChangeSorting(header)}
                    key={header.id}
                    className={
                      'transition-colors hover:border-0 hover:shadow-sm hover:shadow-neutral-100/50'
                    }
                  >
                    {/*{header.label}*/}
                    {/* TODO точнить и поменять заглушку на типе any*/}
                    {translateTable(header.label as any)}
                  </TableHead>
                )
              })}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getUsers.users.map(user => (
              <TableRow key={user.id}>
                <TableCell className={'flex items-center gap-3'}>
                  {user.userBan?.createdAt && <BannedIcon className={'text-light-100'} size={24} />}
                  <span>{user.id}</span>
                </TableCell>
                <TableCell
                  className={'max-w-40 overflow-y-auto whitespace-pre-line text-wrap break-all'}
                >
                  {user.profile.firstName || user.profile.lastName
                    ? `${user.profile.firstName || ''} ${user.profile.lastName || ''}`
                    : '—'}
                </TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    variant={'link'}
                    className={'text-white'}
                    href={{
                      pathname: `/${PROFILE}/${user.id}/${ProfileTabValues.posts}`,
                      query: { from: 'users' },
                    }}
                  >
                    {user.userName}
                  </Button>
                </TableCell>
                <TableCell>{dateFormatting(user.createdAt, { locale })}</TableCell>
                <TableCell className={'max-w-[100px] text-end'}>
                  <TableActionsMenu disabled={disabled}>
                    <UserMenuItem
                      innerText={deleteUser('Delete user')}
                      onClick={() => onDelete?.(user)}
                      icon={<DeleteUserIcon size={24} />}
                    />
                    {!user?.userBan?.createdAt && (
                      <UserMenuItem
                        key={user.id}
                        innerText={banUser('Ban in the system')}
                        onClick={() => onBlock?.(user)}
                        icon={<BannedIcon size={24} />}
                      />
                    )}
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
