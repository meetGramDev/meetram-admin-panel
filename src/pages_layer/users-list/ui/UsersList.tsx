'use client'
import type { UserBlockStatus } from '@/src/shared/api'

import { useState } from 'react'

import { SearchBar } from '@/src/widgets/search-bar'
import { BanSelector } from '@/src/widgets/users-list/ban-selector'
import { UsersListTable } from '@/src/widgets/users-list/table'

export const UsersList = () => {
  const [selectorValue, setSelectorValue] = useState<`${UserBlockStatus}`>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const handleOnValueChange = (value: UserBlockStatus) => {
    setSelectorValue(value)
    console.log(value)
  }

  const handleOnSearchQuery = (value: string) => {
    setSearchQuery(value)
    console.log(value)
  }

  return (
    <div className={'mb-6'}>
      <div className={'flex justify-between gap-3'}>
        <div className={'flex-grow basis-3/4'}>
          <SearchBar onValueQuery={handleOnSearchQuery} />
        </div>
        <div className={'flex basis-1/4 items-start justify-end'}>
          <BanSelector onValueChange={handleOnValueChange} value={selectorValue} />
        </div>
      </div>
      <UsersListTable statusFilter={selectorValue} searchQuery={searchQuery} />
    </div>
  )
}
