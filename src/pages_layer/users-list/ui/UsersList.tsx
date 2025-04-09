'use client'
import type { MutateUserType } from '@/src/entities/user'

import { useState } from 'react'

import { useUserUnBanMutation } from '@/src/pages_layer/users-list/lib/useUserUnBanMutation'
import { UserBlockStatus } from '@/src/shared/api'
import { ConfirmBlock, ConfirmDialog } from '@/src/shared/ui'
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

import { useConfirmDialog } from '../lib/useConfirmDialog'
import { useUserBlockMutation } from '../lib/useUserBlockMutation'
import { useUserDeleteMutation } from '../lib/useUserDeleteMutation'

export const UsersList = () => {
  const tDelete = useTranslations('dialogs.delete')
  const tBan = useTranslations('dialogs.ban')

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
  const [banReason, setBanReason] = useState('')

  const { blockLoading, handleConfirmUserBlock, openBlock, setOpenBlock } = useUserBlockMutation({
    banReason: banReason,
    selectedUser,
  })
  const _resetCurrentPage = () => {
    params.set(PAGE_PARAM_KEY, '1')
  }
  const { deleteLoading, handleConfirmUserDeletion, openDelete, setOpenDelete } =
    useUserDeleteMutation({ selectedUser })

  const { handleConfirmUserUnBan, openUnBan, setOpenUnBan, unBanLoading } = useUserUnBanMutation({
    selectedUser,
  })

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

  const isLoading = deleteLoading || blockLoading || unBanLoading

  const { activeAction, handleConfirm, handleDialogChange, open } = useConfirmDialog({
    handleConfirmUserDeletion,
    handleConfirmUserUnBan,
    openDelete,
    openUnBan,
    setOpenDelete,
    setOpenUnBan,
  })

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
        disabled={isLoading}
        onError={errMsg => setHasError(Boolean(errMsg))}
        statusFilter={blockedFilter}
        searchQuery={searchQuery}
        onDelete={user => {
          setSelectedUser(user)
          setOpenDelete(true)
        }}
        onBlock={user => {
          setSelectedUser(user)
          setOpenBlock(true)
        }}
        onUnBan={user => {
          setSelectedUser(user)
          setOpenUnBan(true)
        }}
      />

      <ConfirmDialog
        open={!!open}
        onOpenChange={handleDialogChange}
        title={activeAction === 'delete' ? tDelete('Delete user') : tBan('Unban user')}
        message={
          <span className={'text-regular16 text-white'}>
            {activeAction === 'delete'
              ? tDelete('Are you sure to delete user')
              : tBan('Are you sure to unban this user')}{' '}
            <span className={'font-bold'}>{selectedUser.userName}</span>?
          </span>
        }
        onConfirm={handleConfirm}
      />

      <ConfirmBlock
        title={tBan('Ban user')}
        open={openBlock}
        onOpenChange={setOpenBlock}
        onConfirm={handleConfirmUserBlock}
        message={
          <span className={'text-regular16 text-white'}>
            {tBan('Are you sure to ban this user')}{' '}
            <span className={'font-bold'}>{selectedUser.userName}</span>?
          </span>
        }
        onChange={setBanReason}
      />
    </div>
  )
}
