'use client'
import { useEffect, useState } from 'react'

type ActionType = 'delete' | 'unban' | null

interface Props {
  handleConfirmUserDeletion: (isConfirm: boolean) => void
  handleConfirmUserUnBan: (isConfirm: boolean) => void
  openDelete: boolean
  openUnBan: boolean
  setOpenDelete: (open: boolean) => void
  setOpenUnBan: (open: boolean) => void
}

export const useConfirmDialog = ({
  handleConfirmUserDeletion,
  handleConfirmUserUnBan,
  openDelete,
  openUnBan,
  setOpenDelete,
  setOpenUnBan,
}: Props) => {
  const [activeAction, setActiveAction] = useState<ActionType>(null)

  useEffect(() => {
    if (openDelete) {
      setActiveAction('delete')
    } else if (openUnBan) {
      setActiveAction('unban')
    }
  }, [openDelete, openUnBan])

  const open = activeAction

  const handleConfirm = (isConfirm: boolean) => {
    if (activeAction === 'delete') {
      handleConfirmUserDeletion(isConfirm)
      setOpenDelete(false)
    } else if (activeAction === 'unban') {
      handleConfirmUserUnBan(isConfirm)
      setOpenUnBan(false)
    }
    setActiveAction(null)
  }

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpenDelete(false)
      setOpenUnBan(false)
      setActiveAction(null)
    }
  }

  return {
    activeAction,
    handleConfirm,
    handleDialogChange,
    open,
  }
}
