'use client'

import type { FollowersListTableHeadKeysType } from '../model/table-headers.types'

import {
  type Get_FollowingsQuery,
  useGet_FollowingsQuery,
} from '@/src/entities/user/api/get-user-following/userFollowings.generated'
import { SortDirection } from '@/src/shared/api'
import { Link, PROFILE, usePathname, useRouter } from '@/src/shared/routes'
import { isGraphQLError } from '@/src/shared/types'
import {
  DataTable,
  PAGE_PARAM_KEY,
  PAGE_SIZE_PARAM_KEY,
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  SortDirectionTable,
  type TableColumn,
  paginationPageSize,
} from '@/src/widgets/table'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { Button } from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils/functions'
import { useParams, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

export const UserFollowing = () => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const paramsId = useParams()

  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]
  const parsedUserId = paramsId?.id ? Number(paramsId.id) : null
  const sortBy = searchParams.get(SORT_BY_PARAM_KEY) || 'createdAt'
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const currentPage = searchParams.get(PAGE_PARAM_KEY) || 1
  const params = new URLSearchParams(searchParams)

  const { data, error, loading } = useGet_FollowingsQuery({
    variables: {
      pageNumber: +currentPage,
      pageSize: +itemsPerPage,
      sortBy,
      sortDirection: sortDir === SortDirectionTable.DESC ? SortDirection.Desc : SortDirection.Asc,
      userId: parsedUserId!,
    },
  })

  const saveSearchParams = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnPageChange = (page: number) => {
    params.set(PAGE_PARAM_KEY, String(page))
    saveSearchParams()
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    params.set(PAGE_SIZE_PARAM_KEY, String(itemsPerPage))
    saveSearchParams()
  }

  const handleChangeSorting = (column: string) => {
    const sortDirection =
      // eslint-disable-next-line no-nested-ternary
      sortBy === column
        ? sortDir === SortDirectionTable.DESC
          ? SortDirectionTable.ASC
          : SortDirectionTable.DESC
        : SortDirectionTable.ASC

    params.set(SORT_PARAM_KEY, String(sortDirection))
    params.set(SORT_BY_PARAM_KEY, column)

    saveSearchParams()
  }

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

  return (
    <DataTable
      columns={followingListTableHeaders}
      data={data?.getFollowing?.items || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : 'Some error. See logs.'}
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
