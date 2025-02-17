import type { User } from '@/src/shared/api'
import type { ITableHead } from '@meetgram/ui-kit'

export type TableHeadKeysType = keyof User

export const tableHeaders: ITableHead<TableHeadKeysType>[] = [
  { id: 1, key: 'id', label: 'User ID' },
  { id: 2, key: 'userName', label: 'Username' },
  { id: 3, key: 'profile', label: 'Profile link' },
  { id: 4, key: 'createdAt', label: 'Date created' },
]
