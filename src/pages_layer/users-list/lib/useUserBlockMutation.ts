import type { UserMutationType } from '@/src/pages_layer/users-list/lib/userMutationType'

import { useState } from 'react'

import { useBan_UserMutation } from '../../../entities/user/api/user-blocking/userBlocking.generated'

export function useUserBlockMutation({
  banReason,
  onCompleted,
  onError,
  selectedUser,
}: UserMutationType) {
  const [openBlock, setOpenBlock] = useState(false)
  const [blockUser, { error, loading: blockLoading }] = useBan_UserMutation({
    onCompleted() {
      alert(`Successfully blocked! User id was ${selectedUser.id}`)
      setOpenBlock(false)
      onCompleted?.()
    },
    onError(error) {
      alert(`Something went wrong!`)
      console.error(error.message)
      setOpenBlock(false)
      onError?.()
    },
    refetchQueries: ['GetUsersList'],
  })

  const handleConfirmUserBlock = (isConfirm: boolean) => {
    if (!isConfirm || selectedUser.id === undefined) {
      setOpenBlock(false)

      return
    }

    blockUser({ variables: { banReason: banReason!, userId: selectedUser.id } })
  }

  return {
    blockLoading,
    error,
    handleConfirmUserBlock,
    openBlock,
    selectedUser,
    setOpenBlock,
  }
}
