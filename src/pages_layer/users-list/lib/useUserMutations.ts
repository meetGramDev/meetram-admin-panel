import { useState } from 'react'

import { useDelete_UserMutation } from '@/src/entities/users'

type SelectedUser = {
  id?: number
  userName?: string
}

/**
 * All CRUD operations for the user
 */
export function useUserMutations() {
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({})

  const [openDelete, setOpenDelete] = useState(false)
  const [deleteUser, { error, loading: deleteLoading }] = useDelete_UserMutation()

  const handleConfirmUserDeletion = async (isConfirm: boolean) => {
    if (!isConfirm || selectedUser.id === undefined) {
      setOpenDelete(false)

      return
    }

    try {
      const isDeleted = await deleteUser({ variables: { userId: selectedUser.id } })

      if (isDeleted) {
        alert(`Successfully deleted! User id was ${selectedUser.id}`)
        setOpenDelete(false)
      } else {
        alert('Something went wrong!')
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    deleteLoading,
    error,
    handleConfirmUserDeletion,
    openDelete,
    selectedUser,
    setOpenDelete,
    setSelectedUser,
  }
}
