import { type ReactNode } from 'react'

import {
  Button,
  type ITableHead,
  Pagination,
  type PaginationProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@meetgram/ui-kit'
import { cn } from '@meetgram/utils'
import { useTranslations } from 'next-intl'

import { TableSkeleton } from './TableSkeleton'

/**
 * Configuration for a table column.
 * @template T - The type of data item in the table
 * @template K - The type of the cell key
 * @template L - The type of the cell label
 */
export interface TableColumn<
  T extends { id?: null | number | string | undefined },
  K extends string = string,
  L extends string = string,
> extends ITableHead<K, L> {
  /**
   * Optional render function to customize how the cell content is displayed
   * @param item - The data item for the current row
   * @returns ReactNode to be rendered in the cell
   */
  render?: (item: T) => ReactNode
}

export const enum SortDirectionTable {
  DESC,
  ASC,
}

/**
 * @template T - The type of data items to be displayed in the table
 * @template K - The type of the cell key
 * @template L - The type of the cell label
 */
type DataTableProps<
  T extends { id?: null | number | string | undefined },
  K extends string = string,
  L extends string = string,
> = {
  /** Optional CSS class name for the table wrapper */
  className?: string
  /** Array of column configurations that define the table structure */
  columns: TableColumn<T, K, L>[]
  /** Array of data items to be displayed in the table */
  data: T[]
  /** Optional error object to display error state */
  error?: string
  /** Flag to indicate if the table is in a loading state */
  loading?: boolean
  /** Callback for button when there is an error */
  onErrorBtn?: () => void
  /** Callback fired when the page is changed */
  onPageChange?: PaginationProps['onPageChange']
  /** Callback fired when the number of items per page is changed */
  onPerPageChange?: PaginationProps['onPerPageChange']
  /** Callback fired when a column sort is triggered */
  onSortChange?: (key: string) => void
  /** Optional pagination configuration */
  pagination?: Omit<PaginationProps, 'onPageChange' | 'onPerPageChange' | 'options'>
  /** Array of available page size options for the pagination */
  paginationOptions?: PaginationProps['options']
  /** Current sort column key */
  sortBy?: string
  /** Current sort direction (1 for ascending, 0 for descending) */
  sortDir?: number
}

/**
 * A reusable table component that supports sorting, pagination, and custom cell rendering.
 *
 * @template T - The type of data items to be displayed in the table
 * @template K - The type of the cell key
 * @template L - The type of the cell label
 *
 */
export function DataTable<
  T extends { id?: null | number | string | undefined },
  K extends string = string,
  L extends string = string,
>({
  className,
  columns,
  data,
  error,
  loading,
  onErrorBtn,
  onPageChange,
  onPerPageChange,
  onSortChange,
  pagination,
  paginationOptions = ['10', '20', '50'],
  sortBy,
  sortDir = SortDirectionTable.DESC,
}: DataTableProps<T, K, L>) {
  const t = useTranslations('info-messages')

  if (loading) {
    return <TableSkeleton />
  }

  if (error) {
    return (
      <div className={'mt-8 flex flex-col items-center justify-center gap-3'}>
        <p className={'text-center text-h1 text-danger-500 lg:text-large'}>{error}</p>
        <Button onClick={onErrorBtn}>{t('Try again')}</Button>
      </div>
    )
  }

  if (!data.length) {
    return <p className={'text-center text-h1 lg:text-large'}>{t('Nothing found')}</p>
  }

  const handlePageChange = (page: number) => onPageChange?.(page)

  const handlePerPageChange = (itemsPerPage: string) => onPerPageChange?.(itemsPerPage)

  const handleSortChange = (sortBy: string) => () => onSortChange?.(sortBy)

  return (
    <>
      <div className={cn(className)}>
        <Table>
          <TableHeader>
            <TableRow className={'has-[:hover]:border-0'}>
              {columns.map(column => (
                <TableHead
                  key={column.key}
                  sort={sortBy === column.key ? sortDir : undefined}
                  onClick={handleSortChange(column.key)}
                  className={
                    'transition-colors hover:border-0 hover:shadow-sm hover:shadow-neutral-100/50'
                  }
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                {columns.map(column => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className={'w-full md:w-1/2'}>
          <Pagination
            options={paginationOptions}
            onPerPageChange={handlePerPageChange}
            onPageChange={handlePageChange}
            {...pagination}
          />
        </div>
      )}
    </>
  )
}
