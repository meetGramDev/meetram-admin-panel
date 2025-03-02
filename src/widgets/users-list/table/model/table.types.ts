import type { usersListTableHeadKeysType } from '../const/users-list-table-headers'

export type TableSortType = {
  sortBy: usersListTableHeadKeysType
  sortDir: SortDirectionTable
}

export const enum SortDirectionTable {
  DESC,
  ASC,
}
