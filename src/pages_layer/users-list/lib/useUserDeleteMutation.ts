import type { UserMutationType } from './userMutationType'
import type { GetUsersListQuery } from '@/src/pages_layer/users-list'

import { useState } from 'react'

import { useDelete_UserMutation } from '@/src/entities/user'

/**
 * Все хуки и колбэки для удаления пользователя
 */
export function useUserDeleteMutation({ onCompleted, onError, selectedUser }: UserMutationType) {
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteUser, { error, loading: deleteLoading }] = useDelete_UserMutation({
    onCompleted() {
      alert(`Successfully deleted! User id was ${selectedUser.id}`)
      setOpenDelete(false)
      onCompleted?.()
    },
    onError(error) {
      alert('Something went wrong!')
      console.error(error.message)
      setOpenDelete(false)
      onError?.()
    },
    update(cache, { data }) {
      cache.modify<GetUsersListQuery>({
        fields: {
          getUsers(getUsersValues, { isReference, readField }) {
            if (!isReference(getUsersValues) && data?.removeUser) {
              return {
                ...getUsersValues,
                users: getUsersValues.users.filter(
                  user => readField('id', user) !== selectedUser.id
                ),
              }
            }
          },
        },
      })
    },
  })

  const handleConfirmUserDeletion = (isConfirm: boolean) => {
    if (!isConfirm || selectedUser.id === undefined) {
      setOpenDelete(false)

      return
    }

    deleteUser({ variables: { userId: selectedUser.id } })
  }

  return {
    deleteLoading,
    error,
    handleConfirmUserDeletion,
    openDelete,
    selectedUser,
    setOpenDelete,
  }
}
