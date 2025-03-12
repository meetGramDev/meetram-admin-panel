'use client'

import {
  type FollowPaginationModel,
  type QueryGetFollowingArgs,
  SortDirection,
} from '@/src/shared/api/models.gen'
import { PROFILE } from '@/src/shared/routes'
import { ProfileTabValues } from '@/src/widgets/tabs'
import {
  type followersListTableHeadKeysType,
  followersListTableHeaders,
} from '@/src/widgets/users-list/table/const/users-list-table-headers'
import {
  PAGE_PARAM_KEY,
  PAGE_SIZE_PARAM_KEY,
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  paginationPageSize,
} from '@/src/widgets/users-list/table/model/pagination-config'
import { SortDirectionTable } from '@/src/widgets/users-list/table/model/table.types'
import { gql, useQuery } from '@apollo/client'
import * as Apollo from '@apollo/client'
import {
  Button,
  type ITableHead,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils/functions'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

export const Get_FollowingDocument = gql`
  query GET_FOLLOWING(
    $pageNumber: Int! = 1
    $pageSize: Int! = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getFollowing(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      items {
        userId
        createdAt
        id
        userName
      }
      pagesCount
      page
      pageSize
      totalCount
    }
  }
`

const defaultOptions = {} as const

export type Get_FollowingQuery = {
  __typename?: 'Query'
  getFollowing: FollowPaginationModel
}

export function useGet_FollowingQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: QueryGetFollowingArgs }) &
    Apollo.QueryHookOptions<Get_FollowingQuery, QueryGetFollowingArgs>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<Get_FollowingQuery, QueryGetFollowingArgs>(Get_FollowingDocument, options)
}

export const UserFollowing = () => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const paramsId = useParams()

  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]
  const parsedUserId = paramsId?.id ? Number(paramsId?.id) : null
  const userSortBy = searchParams.get(SORT_BY_PARAM_KEY) || followersListTableHeaders[3].key
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const currentPage = searchParams.get(PAGE_PARAM_KEY) || 1
  const params = new URLSearchParams(searchParams)

  const { data, error, loading } = useGet_FollowingQuery({
    variables: {
      pageNumber: +currentPage,
      pageSize: +itemsPerPage,
      sortBy: userSortBy,
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
    saveSearchParams
  }
  const handleChangeSorting = (header: ITableHead<followersListTableHeadKeysType>) => {
    const sortDirection =
      // eslint-disable-next-line no-nested-ternary
      userSortBy === header.key
        ? sortDir === SortDirectionTable.DESC
          ? SortDirectionTable.ASC
          : SortDirectionTable.DESC
        : SortDirectionTable.ASC

    params.set(SORT_PARAM_KEY, String(sortDirection))
    params.set(SORT_BY_PARAM_KEY, header.key)

    saveSearchParams()
  }

  return (
    <>
      <div>
        <Table className={'mb-9'}>
          <TableHeader>
            <TableRow>
              {followersListTableHeaders.map(header => (
                <TableHead
                  sort={userSortBy === header.key ? sortDir : undefined}
                  onClick={() => handleChangeSorting(header)}
                  className={
                    'transition-colors hover:border-0 hover:shadow-sm hover:shadow-neutral-100/50'
                  }
                  key={header.id}
                >
                  {header.label}
                </TableHead>
              ))}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getFollowing?.items?.map(following => {
              return (
                <TableRow key={following.userId}>
                  <TableCell className={'flex items-center gap-3'}>{following.userId}</TableCell>
                  <TableCell>{following.userName}</TableCell>
                  <TableCell>
                    {
                      <Button
                        href={{
                          pathname: `/${PROFILE}/${following.userId}/${ProfileTabValues.posts}`,
                        }}
                        variant={'link'}
                        as={Link}
                        className={'text-white'}
                      >
                        {following.userName}
                      </Button>
                    }
                  </TableCell>
                  <TableCell>{dateFormatting(following.createdAt, { locale })}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div className={'w-full md:w-1/2'}>
        {data?.getFollowing.items.length && (
          <Pagination
            currentPage={data?.getFollowing?.page}
            pageCount={data?.getFollowing?.pagesCount}
            onPageChange={handleOnPageChange}
            options={paginationPageSize}
            onPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </>
  )
}
