import type { User } from '@/src/shared/api'

export type MutateUserType = Partial<Omit<User, 'profile'>>
