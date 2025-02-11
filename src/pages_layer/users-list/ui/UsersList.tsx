'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { useState } from 'react'

import { SearchBar } from '@/src/widgets/search-bar'
import { BanSelector } from '@/src/widgets/users-list/ban-selector'
import { UsersListTable } from '@/src/widgets/users-list/table'

export const UsersList = () => {
  const [selectorValue, setSelectorValue] = useState<`${UserBlockStatus}`>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  // для дизейблинга UI
  const [hasError, setHasError] = useState(false)

  const handleOnValueChange = (value: UserBlockStatus) => {
    setSelectorValue(value)
    console.log(value)
  }

  const handleOnSearchQuery = (value: string) => {
    setSearchQuery(value)
    console.log(value)
  }

  return (
    <div className={'pb-6 xl:mb-12'}>
      <div className={'flex flex-wrap sm:flex-nowrap sm:justify-between sm:gap-6 xl:gap-24'}>
        <div className={'flex-grow basis-full sm:basis-2/3 xl:basis-3/4'}>
          <SearchBar onValueQuery={handleOnSearchQuery} />
        </div>
        <div className={'mb-6 flex basis-full items-start sm:basis-1/3 xl:basis-1/4'}>
          <BanSelector
            disabled={hasError}
            onValueChange={handleOnValueChange}
            value={selectorValue}
            rootClassName={'w-full h-full'}
          />
        </div>
      </div>

      <UsersListTable
        onError={errMsg => setHasError(Boolean(errMsg))}
        statusFilter={selectorValue}
        searchQuery={searchQuery}
      />
    </div>
  )
}
