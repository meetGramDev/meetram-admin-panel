import type { UsersListTableProps } from '../ui/UsersListTable'
import type { UserBlockStatus } from '@/src/shared/api'

import { useEffect } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useGetUsersListQuery } from '../api/users.generated'
import { PAGE_PARAM_KEY, PAGE_SIZE_PARAM_KEY, paginationPageSize } from '../model/pagination-config'

export function useUsersListTable({ onError, searchQuery, statusFilter }: UsersListTableProps) {
  const pathname = usePathname()
  const router = useRouter()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const page = searchParams.get(PAGE_PARAM_KEY) || 1
  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]

  const { data, error, loading, refetch } = useGetUsersListQuery({
    pollInterval: 300000, // 5 min
    variables: {
      pageNumber: +page,
      pageSize: +itemsPerPage,
      searchTerm: searchQuery,
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

  const handleOnPageChange = (page: number) => {
    params.set(PAGE_PARAM_KEY, String(page))

    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    params.set(PAGE_SIZE_PARAM_KEY, String(itemsPerPage))

    router.replace(`${pathname}?${params.toString()}`)
  }

  return {
    data,
    error,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    loading,
    page,
    params,
    refetch,
    searchParams,
  }
}
