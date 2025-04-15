import type { UsersListTableProps } from '../ui/UsersListTable'

import { useEffect } from 'react'

import { UserBlockStatus } from '@/src/shared/api'
import { useTableSorting } from '@/src/widgets/table'

import { useGetUsersListQuery } from '../api/users.generated'

export function useUsersListTable({ onError, searchQuery, statusFilter }: UsersListTableProps) {
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

  const { data, error, loading, refetch } = useGetUsersListQuery({
    pollInterval: 300000, // 5 min
    variables: {
      pageNumber: currentPage,
      pageSize: +itemsPerPage,
      searchTerm: searchQuery,
      sortBy,
      sortDirection,
      // сервер ожидает строковое значение из енамки,
      // типизация верная, но без as ts ругается.
      statusFilter: statusFilter === 'ALL' ? undefined : (statusFilter as UserBlockStatus),
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
