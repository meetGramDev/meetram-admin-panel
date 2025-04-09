import type { MutateUserType } from '@/src/entities/user'

export type UserMutationType = {
  banReason?: string
  onCompleted?: () => void
  onError?: () => void
  selectedUser: MutateUserType
}
