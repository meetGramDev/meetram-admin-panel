'use client'

import type { FollowersListTableHeadKeysType } from '../model/table-headers.types'

import {
  type Get_FollowingsQuery,
  useGet_FollowingsQuery,
} from '@/src/entities/user/api/get-user-following/userFollowings.generated'
import { Link, PROFILE } from '@/src/shared/routes'
import { isGraphQLError } from '@/src/shared/types'
import {
  DataTable,
  type TableColumn,
  paginationPageSize,
  useTableSorting,
} from '@/src/widgets/table'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { Button } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils/functions'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'

export const UserFollowing = () => {
  const locale = useLocale()
  const paramsId = useParams()
  const parsedUserId = paramsId?.id ? Number(paramsId.id) : null

  const followingListTableHeaders: TableColumn<
    Get_FollowingsQuery['getFollowing']['items'][0],
    FollowersListTableHeadKeysType
  >[] = [
    {
      id: 1,
      key: 'id',
      label: 'User ID',
      render: following => (
        <div className={'flex items-center gap-3'}>
          <span>{following.id}</span>
        </div>
      ),
    },
    { id: 2, key: 'userName', label: 'Username' },
    {
      id: 3,
      key: 'userId',
      label: 'Profile link',
      render: following => (
        <Button
          as={Link}
          variant={'link'}
          className={'text-white'}
          href={{
            pathname: `/${PROFILE}/${following.userId}/${ProfileTabValues.posts}`,
          }}
        >
          {following.userName}
        </Button>
      ),
    },
    {
      id: 4,
      key: 'createdAt',
      label: 'Subscription Date',
      render: following => dateFormatting(following.createdAt, { locale }),
    },
  ]

  const {
    currentPage,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    sortBy,
    sortDir,
    sortDirection,
  } = useTableSorting({ defaultSortBy: followingListTableHeaders[3].key })

  const { data, error, loading, refetch } = useGet_FollowingsQuery({
    variables: {
      pageNumber: currentPage,
      pageSize: itemsPerPage,
      sortBy,
      sortDirection,
      userId: parsedUserId!,
    },
  })

  return (
    <DataTable
      onErrorBtn={refetch}
      columns={followingListTableHeaders}
      data={data?.getFollowing?.items || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : ''}
      sortBy={sortBy}
      sortDir={sortDir}
      onSortChange={handleChangeSorting}
      pagination={data?.getFollowing}
      paginationOptions={paginationPageSize}
      onPageChange={handleOnPageChange}
      onPerPageChange={handleItemsPerPageChange}
      className={'mb-9'}
    />
  )
}
