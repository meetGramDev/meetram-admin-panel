import type { User } from '@/src/shared/api'
import type { TableActionHeader } from '@/src/widgets/table'

export type UsersListTableHeadKeysType = TableActionHeader | keyof User
