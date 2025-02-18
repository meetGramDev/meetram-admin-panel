import type { UsersListTableProps } from '../ui/UsersListTable'
import type { ITableHead } from '@meetgram/ui-kit'

import { useEffect } from 'react'

import { SortDirection, type UserBlockStatus } from '@/src/shared/api'
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

export function useUsersListTable({ onError, searchQuery, statusFilter }: UsersListTableProps) {
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

    _saveSearchParams()
  }, [])

  const _saveSearchParams = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnPageChange = (page: number) => {
    params.set(PAGE_PARAM_KEY, String(page))

    _saveSearchParams()
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    params.set(PAGE_SIZE_PARAM_KEY, String(itemsPerPage))

    _saveSearchParams()
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

    _saveSearchParams()
  }

  return {
    data,
    error,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    loading,
    page,
    params,
    refetch,
    searchParams,
    sortBy,
    sortDir,
  }
}
