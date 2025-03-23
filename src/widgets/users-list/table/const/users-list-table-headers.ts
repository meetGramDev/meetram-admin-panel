import type { Follow, Payment, User } from '@/src/shared/api'
import type { ITableHead } from '@meetgram/ui-kit'

export type usersListTableHeadKeysType = keyof User
export type followersListTableHeadKeysType = keyof Follow
export type paymentsListTableHeadKeysType = keyof Payment

export const usersListTableHeaders: ITableHead<usersListTableHeadKeysType>[] = [
  { id: 1, key: 'id', label: 'User ID' },
  { id: 2, key: 'userName', label: 'Username' },
  { id: 3, key: 'profile', label: 'Profile link' },
  { id: 4, key: 'createdAt', label: 'Date created' },
]

export const followersListTableHeaders: ITableHead<followersListTableHeadKeysType>[] = [
  { id: 1, key: 'id', label: 'User ID' },
  { id: 2, key: 'userName', label: 'Username' },
  { id: 3, key: 'userId', label: 'Profile link' },
  { id: 4, key: 'createdAt', label: 'Subscription Date' },
]

export const paymentListTableHeaders: ITableHead<paymentsListTableHeadKeysType>[] = [
  { id: 1, key: 'createdAt', label: 'Date of Payment' },
  { id: 2, key: 'endDate', label: 'End date of subscription' },
  { id: 3, key: 'amount', label: 'Amount, $' },
  { id: 4, key: 'type', label: 'Subscription Type' },
  { id: 5, key: 'paymentMethod', label: 'Payment Type' },
]
