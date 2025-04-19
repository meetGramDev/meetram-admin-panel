import type { PaymentsListTableProps } from '../ui/PaymentsListTable'

import { useEffect } from 'react'

import { useTableSorting } from '@/src/widgets/table'

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

  const { data, error, loading, refetch } = useGetPaymentsListQuery({
    pollInterval: 300000,
    variables: {
      pageNumber: currentPage,
      pageSize: +itemsPerPage,
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
