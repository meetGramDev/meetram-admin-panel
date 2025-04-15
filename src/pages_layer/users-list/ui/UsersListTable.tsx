'use client'

import type { GetUsersListQuery } from '../api/users.generated'
import type { UsersListTableHeadKeysType } from '../model/table-headers.types'
import type { UserBlockStatus } from '@/src/shared/api'

import { type MutateUserType, UserMenuItem } from '@/src/entities/user'
import { TableActionsMenu } from '@/src/features/table-actions-menu'
import { BannedIcon, CheckMarkIcon, DeleteUserIcon } from '@/src/shared/assets/icons'
import { Link, PROFILE } from '@/src/shared/routes'
import { isGraphQLError } from '@/src/shared/types'
import { DataTable, type TableColumn, paginationPageSize } from '@/src/widgets/table'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { Button } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'
import { useLocale, useTranslations } from 'next-intl'

import { useUsersListTable } from '../lib/useUsersListTable'

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
  onUnBan?: (user: MutateUserType) => void
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

export const UsersListTable = ({
  disabled,
  onBlock,
  onDelete,
  onUnBan,
  ...props
}: UsersListTableProps) => {
  const locale = useLocale()
  const t = useTranslations('user-list-items-table-header')
  const deleteUser = useTranslations('dialogs.delete')
  const banUser = useTranslations('dialogs.ban')

  const {
    currentPage,
    data,
    error,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    loading,
    refetch,
    sortBy,
    sortDir,
  } = useUsersListTable(props)

  const usersListTableColumns: TableColumn<
    GetUsersListQuery['getUsers']['users'][0],
    UsersListTableHeadKeysType
  >[] = [
    {
      id: 1,
      key: 'id',
      label: t('User ID'),
      render: user => (
        <div className={'flex items-center gap-3'}>
          {user.userBan?.createdAt && <BannedIcon className={'text-light-100'} size={24} />}
          <span>{user.id}</span>
        </div>
      ),
    },
    {
      id: 2,
      key: 'userName',
      label: t('Username'),
      render: user => (
        <div className={'max-w-40 overflow-y-auto whitespace-pre-line text-wrap break-all'}>
          {user.profile.firstName || user.profile.lastName
            ? `${user.profile.firstName || ''} ${user.profile.lastName || ''}`
            : '—'}
        </div>
      ),
    },
    {
      id: 3,
      key: 'profile',
      label: t('Profile link'),
      render: user => (
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
      ),
    },
    {
      id: 4,
      key: 'createdAt',
      label: t('Date created'),
      render: user => dateFormatting(user.createdAt, { locale }),
    },
    {
      id: 5,
      key: 'action',
      label: '',
      render: user => (
        <div className={'max-w-[100px] text-end'}>
          <TableActionsMenu disabled={disabled}>
            <UserMenuItem
              innerText={deleteUser('Delete user')}
              onClick={() => onDelete?.(user)}
              icon={<DeleteUserIcon size={24} />}
            />
            {user?.userBan?.createdAt ? (
              <UserMenuItem
                innerText={banUser('Unban in the system')}
                onClick={() => onUnBan?.(user)}
                icon={<CheckMarkIcon size={24} />}
              />
            ) : (
              <UserMenuItem
                innerText={banUser('Ban in the system')}
                onClick={() => onBlock?.(user)}
                icon={<BannedIcon size={24} />}
              />
            )}
          </TableActionsMenu>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      onErrorBtn={refetch}
      columns={usersListTableColumns}
      data={data?.getUsers.users || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : ''}
      sortBy={sortBy}
      sortDir={sortDir}
      onSortChange={handleChangeSorting}
      pagination={{
        currentPage: data?.getUsers.pagination.page ?? currentPage,
        pageCount: data?.getUsers.pagination.pagesCount ?? 0,
        perPage: String(data?.getUsers.pagination.pageSize) ?? itemsPerPage,
      }}
      paginationOptions={paginationPageSize}
      onPageChange={handleOnPageChange}
      onPerPageChange={handleItemsPerPageChange}
      className={'mb-9'}
    />
  )
}
