import { useEffect } from 'react'

import { SortDirection } from '@/src/shared/api'
import { usePathname, useRouter } from '@/src/shared/routes'
import { useSearchParams } from 'next/navigation'

import {
  PAGE_PARAM_KEY,
  PAGE_SIZE_PARAM_KEY,
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  paginationPageSize,
} from '../const/pagination-config'
import { SortDirectionTable } from '../ui/DataTable'

export type UseTableSortingResult = {
  currentPage: number
  handleChangeSorting: (column: string) => void
  handleItemsPerPageChange: (itemsPerPage: number) => void
  handleOnPageChange: (page: number) => void
  itemsPerPage: number
  sortBy: string
  /** Current sort direction (1 for ascending, 0 for descending) */
  sortDir: SortDirectionTable
  /** Same as `sortDir` but converted to string value */
  sortDirection: SortDirection
}

export type UseTableSortingProps = {
  defaultSortBy: string
}

export function useTableSorting({ defaultSortBy }: UseTableSortingProps): UseTableSortingResult {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)

  const currentPage = +(searchParams.get(PAGE_PARAM_KEY) || 1)
  const itemsPerPage = +(searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1])
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const sortBy = searchParams.get(SORT_BY_PARAM_KEY) || defaultSortBy

  // При монтировании проверить, стоят ли параметры для сортировки.
  // Если нет, то предустановить их.
  useEffect(() => {
    if (!searchParams.get(SORT_PARAM_KEY)) {
      params.set(SORT_PARAM_KEY, String(SortDirectionTable.DESC))
    }

    if (!searchParams.get(SORT_BY_PARAM_KEY)) {
      params.set(SORT_BY_PARAM_KEY, 'createdAt')
    }

    saveSearchParams()
  }, [])

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

  return {
    currentPage,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    sortBy,
    sortDir,
    sortDirection: sortDir === SortDirectionTable.DESC ? SortDirection.Desc : SortDirection.Asc,
  }
}
