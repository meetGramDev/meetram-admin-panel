import type { PaymentsListTableProps } from '../ui/PaymentsListTable'

import { useEffect } from 'react'

import { PAGE_SIZE_PARAM_KEY, useTableSorting } from '@/src/widgets/table'
import { useSearchParams } from 'next/navigation'

import { useGetPaymentsListQuery } from '../api/payments.generated'

export function usePaymentsTable({ onError, searchQuery }: PaymentsListTableProps) {
  const {
    currentPage,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    sortBy,
    sortDir,
    sortDirection,
  } = useTableSorting({ defaultSortBy: 'createdAt' })

  const searchParams = useSearchParams()

  const initialPageSize = searchParams.get(PAGE_SIZE_PARAM_KEY) ? itemsPerPage : 6

  const { data, error, loading, refetch } = useGetPaymentsListQuery({
    pollInterval: 300000,
    variables: {
      pageNumber: currentPage,
      pageSize: +initialPageSize,
      searchTerm: searchQuery,
      sortBy,
      sortDirection,
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

  return {
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
  }
}
