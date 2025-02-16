'use client'
import { useEffect } from 'react'

import { useLocale } from '@/src/app_layer/i18n'
import { SortDirection, type UserBlockStatus } from '@/src/shared/api'
import { BannedIcon } from '@/src/shared/assets/icons'
import { PROFILE } from '@/src/shared/routes'
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useGetUsersListQuery } from '../api/users.generated'
import { type TableHeadKeysType, tableHeaders } from '../const/table-headers'
import {
  PAGE_PARAM_KEY,
  PAGE_SIZE_PARAM_KEY,
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  paginationPageSize,
} from '../model/pagination-config'
import { SortDirectionTable } from '../model/table.types'
import { TableSkeleton } from './TableSkeleton'

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
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const page = searchParams.get(PAGE_PARAM_KEY) || 1
  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const sortBy = searchParams.get(SORT_BY_PARAM_KEY) || tableHeaders[3].key

  const { data, error, loading, refetch } = useGetUsersListQuery({
    pollInterval: 300000, // 5 min
    variables: {
      pageNumber: +page,
      pageSize: +itemsPerPage,
      searchTerm: searchQuery,
      sortBy,
      sortDirection: sortDir === SortDirectionTable.DESC ? SortDirection.Desc : SortDirection.Asc,
      // сервер ожидает строковое значение из енамки,
      // типизация верная, но без as ts ругается.
      statusFilter: statusFilter as UserBlockStatus | undefined,
    },
  })

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

  // При монтировании проверить, стоят ли параметры для сортировки.
  // Если нет, то предустановить их.
  useEffect(() => {
    if (!searchParams.get(SORT_PARAM_KEY)) {
      params.set(SORT_PARAM_KEY, String(SortDirectionTable.DESC))
    }

    if (!searchParams.get(SORT_BY_PARAM_KEY)) {
      params.set(SORT_BY_PARAM_KEY, tableHeaders[3].key)
    }

    router.replace(`${pathname}?${params.toString()}`)
  }, [])

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

  const handleOnPageChange = (page: number) => {
    params.set(PAGE_PARAM_KEY, String(page))

    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    params.set(PAGE_SIZE_PARAM_KEY, String(itemsPerPage))

    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleChangeSorting = (header: ITableHead<TableHeadKeysType>) => {
    const sortDirection =
      // eslint-disable-next-line no-nested-ternary
      sortBy === header.key
        ? sortDir === SortDirectionTable.DESC
          ? SortDirectionTable.ASC
          : SortDirectionTable.DESC
        : SortDirectionTable.ASC

    params.set(SORT_PARAM_KEY, String(sortDirection))
    params.set(SORT_BY_PARAM_KEY, header.key)

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <div className={'mb-9'}>
        <Table>
          <TableHeader>
            <TableRow className={'has-[:hover]:border-0'}>
              {tableHeaders.map(header => (
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
