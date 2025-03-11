'use client'

import * as Types from '@/src/shared/api/models.gen'
import { PROFILE } from '@/src/shared/routes'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { followersListTableHeaders } from '@/src/widgets/users-list/table/const/users-list-table-headers'
import {
  PAGE_SIZE_PARAM_KEY,
  paginationPageSize,
} from '@/src/widgets/users-list/table/model/pagination-config'
import { gql, useQuery } from '@apollo/client'
import * as Apollo from '@apollo/client'
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

export type Get_FollowingQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>
export type Get_FollowingQuery = {
  __typename?: 'Query'
  getFollowing: {
    __typename?: 'FollowPaginationModel'
    items: Array<{
      __typename?: 'Follow'
      createdAt: any
      id: number
      userId: number
      userName?: null | string
    }>
    page: number
    pageSize: number
    pagesCount: number
    totalCount: number
  }
}

export function useGet_FollowingQuery(
  baseOptions: ({ skip: boolean } | { skip?: boolean; variables: Get_FollowingQueryVariables }) &
    Apollo.QueryHookOptions<Get_FollowingQuery, Get_FollowingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<Get_FollowingQuery, Get_FollowingQueryVariables>(
    Get_FollowingDocument,
    options
  )
}

export const UserFollowing = () => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]

  const parsedUserId = params?.id ? Number(params?.id) : null

  const { data, error, loading } = useGet_FollowingQuery({
    variables: {
      pageNumber: 1,
      pageSize: +itemsPerPage,
      sortBy: 'createdAt',
      sortDirection: 'desc',
      userId: parsedUserId!,
    },
  })

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {followersListTableHeaders.map(header => (
                <TableHead
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
                  <TableCell>{following.userId}</TableCell>
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
      {/*<div className={'w-full md:w-1/2'}>*/}
      {/*  {data?.getFollowing.items.length && (*/}
      {/*    <Pagination*/}
      {/*      currentPage={data?.getFollowing.page}*/}
      {/*      pageCount={data?.getFollowing.pagesCount}*/}
      {/*      onPageChange={handleOnPageChange}*/}
      {/*      options={paginationPageSize}*/}
      {/*      onPerPageChange={handleItemsPerPageChange}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </>
  )
}
