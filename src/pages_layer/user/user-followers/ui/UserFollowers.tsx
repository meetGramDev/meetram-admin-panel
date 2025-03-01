'use client'
import { useLocale } from '@/src/app_layer/i18n'
import { useGet_FollowersQuery } from '@/src/entities/user/api/get-user-followers/userFollowers.generated'
import { SortDirection } from '@/src/shared/api'
import { PROFILE } from '@/src/shared/routes'
import { ProfileTabValues } from '@/src/widgets/tabs'
import {
  type followersListTableHeadKeysType,
  followersListTableHeaders,
  usersListTableHeaders,
} from '@/src/widgets/users-list/table/const/users-list-table-headers'
import {
  PAGE_PARAM_KEY,
  PAGE_SIZE_PARAM_KEY,
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  paginationPageSize,
} from '@/src/widgets/users-list/table/model/pagination-config'
import { SortDirectionTable } from '@/src/widgets/users-list/table/model/table.types'
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
import { dateFormatting } from '@meetgram/utils'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export const UserFollowers = () => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const sortBy = searchParams.get(SORT_BY_PARAM_KEY) || usersListTableHeaders[3].key
  const page = searchParams.get(PAGE_PARAM_KEY) || 1
  const params = new URLSearchParams(searchParams)

  const paramsId = useParams()
  const parsedUserId = paramsId?.id ? Number(paramsId.id) : null

  const { data } = useGet_FollowersQuery({
    variables: {
      pageNumber: +page,
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

  const handleChangeSorting = (header: ITableHead<followersListTableHeadKeysType>) => {
    const sortDirection =
      // eslint-disable-next-line no-nested-ternary
      sortBy === header.key
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
      <div className={'mb-9'}>
        <Table>
          <TableHeader>
            <TableRow className={'has-[:hover]:border-0'}>
              {followersListTableHeaders.map(header => (
                <TableHead
                  sort={sortBy === header.key ? sortDir : undefined}
                  onClick={() => handleChangeSorting(header)}
                  key={header.id}
                  className={
                    'transition-colors hover:border-0 hover:shadow-sm hover:shadow-neutral-100/50'
                  }
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getFollowers.items.map(follower => (
              <TableRow key={follower.id}>
                <TableCell className={'flex items-center gap-3'}>
                  <span>{follower.id}</span>
                </TableCell>
                <TableCell>{follower.userName}</TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    variant={'link'}
                    className={'text-white'}
                    href={{
                      pathname: `/${PROFILE}/${follower.userId}/${ProfileTabValues.posts}`,
                    }}
                  >
                    {follower.userName}
                  </Button>
                </TableCell>
                <TableCell>{dateFormatting(follower.createdAt, { locale })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className={'w-full md:w-1/2'}>
        {data?.getFollowers.items.length && (
          <Pagination
            currentPage={data?.getFollowers.page}
            pageCount={data?.getFollowers.pagesCount}
            onPageChange={handleOnPageChange}
            options={paginationPageSize}
            onPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </>
  )
}
