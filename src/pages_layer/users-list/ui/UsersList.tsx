'use client'
import type { MutateUserType } from '@/src/entities/user'

import { useState } from 'react'

import { UserBlockStatus } from '@/src/shared/api'
import { ConfirmDialog } from '@/src/shared/ui'
import { SearchBar } from '@/src/widgets/search-bar'
import { BanSelector } from '@/src/widgets/users-list/ban-selector'
import {
  FILTER_PARAM_KEY,
  PAGE_PARAM_KEY,
  SEARCH_PARAM_KEY,
  UsersListTable,
} from '@/src/widgets/users-list/table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useUserDeleteMutation } from '../lib/useUserMutations'

export const UsersList = () => {
  const t = useTranslations('dialogs.delete')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = new URLSearchParams(searchParams)
  const searchQuery = searchParams.get(SEARCH_PARAM_KEY) ?? ''
  const blockedFilterParam = searchParams.get(FILTER_PARAM_KEY)
  // нужно явно указать тип, т.к typeof для query параметров по умолчанию string
  const blockedFilter = blockedFilterParam
    ? (blockedFilterParam.toUpperCase() as UserBlockStatus)
    : UserBlockStatus.All

  // для дизейблинга UI
  const [hasError, setHasError] = useState(false)
  const [selectedUser, setSelectedUser] = useState<MutateUserType>({})

  const { deleteLoading, handleConfirmUserDeletion, openDelete, setOpenDelete } =
    useUserDeleteMutation({ selectedUser })

  const _resetCurrentPage = () => {
    params.set(PAGE_PARAM_KEY, '1')
  }

  const _saveSearchParams = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnValueChange = (value: UserBlockStatus) => {
    switch (value) {
      case UserBlockStatus.All:
        params.delete(FILTER_PARAM_KEY)
        break
      case UserBlockStatus.Blocked:
      case UserBlockStatus.Unblocked:
        params.set(FILTER_PARAM_KEY, value.toLowerCase())
        break
      default:
        params.delete(FILTER_PARAM_KEY)
        break
    }

    _resetCurrentPage()
    _saveSearchParams()
  }

  const handleOnSearchQuery = (value: string) => {
    const previousSearch = params.get(SEARCH_PARAM_KEY)

    if (value) {
      // перед новый поиском, сбросить до первой страницы
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
    <div className={'pb-6 xl:mb-12'}>
      <div className={'flex flex-wrap sm:flex-nowrap sm:justify-between sm:gap-6 xl:gap-24'}>
        <div className={'flex-grow basis-full sm:basis-2/3 xl:basis-3/4'}>
          <SearchBar onValueQuery={handleOnSearchQuery} defaultValue={searchQuery} />
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
        disabled={deleteLoading}
        onError={errMsg => setHasError(Boolean(errMsg))}
        statusFilter={blockedFilter}
        searchQuery={searchQuery}
        onDelete={user => {
          setSelectedUser(user)
          setOpenDelete(true)
        }}
      />

      <ConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title={t('Delete user')}
        message={
          <span className={'text-regular16 text-white'}>
            {t('Are you sure to delete user')}{' '}
            <span className={'font-bold'}>{selectedUser.userName}</span>?
          </span>
        }
        onConfirm={handleConfirmUserDeletion}
      />
    </div>
  )
}
