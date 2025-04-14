'use client'

import type { GetUsersListQuery } from '../api/users.generated'
import type { UsersListTableHeadKeysType } from '../model/table-headers.types'
import type { UserBlockStatus } from '@/src/shared/api'

import { DeleteUserMenuItem, type MutateUserType } from '@/src/entities/user'
import { TableActionsMenu } from '@/src/features/table-actions-menu'
import { BannedIcon } from '@/src/shared/assets/icons'
import { Link, PROFILE } from '@/src/shared/routes'
import { isGraphQLError } from '@/src/shared/types'
import { DataTable, type TableColumn } from '@/src/widgets/table'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { Button } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'
import { useLocale, useTranslations } from 'next-intl'

import { paginationPageSize } from '../../../widgets/table/const/pagination-config'
import { useUsersListTable } from '../lib/useUsersListTable'

export type UsersListTableProps = {
  disabled?: boolean
  onDelete?: (user: MutateUserType) => void
  onError?: (error: string) => void
  searchQuery?: string
  statusFilter?: `${UserBlockStatus}`
}

export const UsersListTable = ({ disabled, onDelete, ...props }: UsersListTableProps) => {
  const locale = useLocale()
  const t = useTranslations('user-list-items-table-header')
  const {
    data,
    error,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    loading,
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
            <DeleteUserMenuItem onClick={() => onDelete?.(user)} />
          </TableActionsMenu>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={usersListTableColumns}
      data={data?.getUsers.users || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : 'Some error. See logs.'}
      sortBy={sortBy}
      sortDir={sortDir}
      onSortChange={handleChangeSorting}
      pagination={data?.getUsers.pagination}
      paginationOptions={paginationPageSize}
      onPageChange={handleOnPageChange}
      onPerPageChange={handleItemsPerPageChange}
      className={'mb-9'}
    />
  )
}
