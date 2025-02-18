import type { TableHeadKeysType } from '../const/table-headers'

export type TableSortType = {
  sortBy: TableHeadKeysType
  sortDir: SortDirectionTable
}

export const enum SortDirectionTable {
  DESC,
  ASC,
}
