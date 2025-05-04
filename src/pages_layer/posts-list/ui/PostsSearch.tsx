'use client'

import { SearchBar } from '@/src/widgets/search-bar'
import { SEARCH_PARAM_KEY } from '@/src/widgets/table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const PostsSearch = ({
  setSearchQuery,
}: {
  setSearchQuery: (searchQuery: string) => void
}) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()
  const searchQuery = searchParams.get(SEARCH_PARAM_KEY) ?? ''
  const _saveSearchParams = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnSearchQuery = (value: string) => {
    const previousSearch = params.get(SEARCH_PARAM_KEY)

    if (value) {
      if (!searchQuery || previousSearch !== value) {
        // _resetCurrentPage()
      }

      params.set(SEARCH_PARAM_KEY, value)
    } else {
      params.delete(SEARCH_PARAM_KEY)
    }

    setSearchQuery(value)

    _saveSearchParams()
  }

  return (
    <>
      {' '}
      <SearchBar onValueQuery={handleOnSearchQuery} defaultValue={searchQuery} />
    </>
  )
}
