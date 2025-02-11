'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { useState } from 'react'

import { SearchBar } from '@/src/widgets/search-bar'
import { BanSelector } from '@/src/widgets/users-list/ban-selector'
import {
  FILTER_PARAM_KEY,
  PAGE_PARAM_KEY,
  SEARCH_PARAM_KEY,
  UsersListTable,
} from '@/src/widgets/users-list/table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const UsersList = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = new URLSearchParams(searchParams)
  const searchQuery = searchParams.get(SEARCH_PARAM_KEY) ?? ''
  // сервер ожидает строковое значение из енамки,
  // типизация верная, но без as ts ругается.
  const blockedFilter =
    (searchParams.get(FILTER_PARAM_KEY)?.toString().toUpperCase() as `${UserBlockStatus}`) || 'ALL'

  // для дизейблинга UI
  const [hasError, setHasError] = useState(false)

  const handleOnValueChange = (value: `${UserBlockStatus}`) => {
    switch (value) {
      case 'ALL':
        params.delete(FILTER_PARAM_KEY)
        break
      case 'BLOCKED':
      case 'UNBLOCKED':
        params.set(FILTER_PARAM_KEY, value.toLowerCase())
        break
      default:
        params.delete(FILTER_PARAM_KEY)
        break
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnSearchQuery = (value: string) => {
    const previousSearch = params.get(SEARCH_PARAM_KEY)

    if (value) {
      // перед новый поиском, сбросить до первой страницы
      if (!searchQuery || previousSearch !== value) {
        params.set(PAGE_PARAM_KEY, '1')
      }

      params.set(SEARCH_PARAM_KEY, value)
    } else {
      params.delete(SEARCH_PARAM_KEY)
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={'pb-6 xl:mb-12'}>
      <div className={'flex flex-wrap sm:flex-nowrap sm:justify-between sm:gap-6 xl:gap-24'}>
        <div className={'flex-grow basis-full sm:basis-2/3 xl:basis-3/4'}>
          <SearchBar onValueQuery={handleOnSearchQuery} />
        </div>
        <div className={'mb-6 flex basis-full items-start sm:basis-1/3 xl:basis-1/4'}>
          <BanSelector
            defaultValue={blockedFilter}
            disabled={hasError}
            onValueChange={handleOnValueChange}
            value={blockedFilter}
            rootClassName={'w-full h-full'}
          />
        </div>
      </div>

      <UsersListTable
        onError={errMsg => setHasError(Boolean(errMsg))}
        statusFilter={blockedFilter}
        searchQuery={searchQuery}
      />
    </div>
  )
}
