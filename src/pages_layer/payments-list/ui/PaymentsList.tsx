'use client'
import { usePathname, useRouter } from '@/src/shared/routes'
import { SearchBar } from '@/src/widgets/search-bar'
import { PAGE_PARAM_KEY, SEARCH_PARAM_KEY } from '@/src/widgets/table'
import { useSearchParams } from 'next/navigation'

import { PaymentsListTable } from './PaymentsListTable'

export const PaymentsList = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = new URLSearchParams(searchParams)
  const searchQuery = searchParams.get(SEARCH_PARAM_KEY) ?? ''

  const _resetCurrentPage = () => {
    params.set(PAGE_PARAM_KEY, '1')
  }

  const _saveSearchParams = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnSearchQuery = (value: string) => {
    const previousSearch = params.get(SEARCH_PARAM_KEY)

    if (value) {
      if (!searchQuery || previousSearch !== value) {
        _resetCurrentPage()
      }

      params.set(SEARCH_PARAM_KEY, value)
    } else {
      params.delete(SEARCH_PARAM_KEY)
    }

    _saveSearchParams()
  }

  return (
    <div>
      <div className={'pb-6 xl:mb-12'}>
        <div className={'flex flex-wrap sm:flex-nowrap sm:justify-between sm:gap-6 xl:gap-24'}>
          <div className={'flex-grow basis-full sm:basis-2/3 xl:basis-3/4'}>
            <SearchBar onValueQuery={handleOnSearchQuery} defaultValue={searchQuery} />
          </div>
        </div>
        <PaymentsListTable searchQuery={searchQuery} />
      </div>
    </div>
  )
}
