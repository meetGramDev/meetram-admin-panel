import type { UserMutationType } from '@/src/pages_layer/users-list/lib/userMutationType'

import { useState } from 'react'

import { useUn_Ban_UserMutation } from '@/src/entities/user/api/unlock-user/userUnBan.generated'

export function useUserUnBanMutation({ onCompleted, onError, selectedUser }: UserMutationType) {
  const [openUnBan, setOpenUnBan] = useState(false)
  const [unBanUser, { error, loading: unBanLoading }] = useUn_Ban_UserMutation({
    onCompleted() {
      alert(`Successfully unblocked! User id is ${selectedUser.id}`)
      setOpenUnBan(false)
      onCompleted?.()
    },
    onError(error) {
      alert(`Something went wrong!`)
      console.error(error.message)
      setOpenUnBan(false)
      onError?.()
    },
    refetchQueries: ['GetUsersList'],
  })

  const handleConfirmUserUnBan = (isConfirm: boolean) => {
    if (!isConfirm || selectedUser.id === undefined) {
      setOpenUnBan(false)

      return
    }

    unBanUser({ variables: { userId: selectedUser.id } })
  }

  return {
    error,
    handleConfirmUserUnBan,
    openUnBan,
    selectedUser,
    setOpenUnBan,
    unBanLoading,
  }
}
