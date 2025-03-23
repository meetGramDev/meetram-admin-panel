'use client'

import { useLocale } from '@/src/app_layer/i18n'
import { useGet_User_PaymentsQuery } from '@/src/entities/user/api/get-user-payments/getUserPayments.generated'
import { PAGE_PARAM_KEY, PAGE_SIZE_PARAM_KEY } from '@/src/widgets/users-list/table'
import {
  paymentListTableHeaders,
  type paymentsListTableHeadKeysType,
} from '@/src/widgets/users-list/table/const/users-list-table-headers'
import {
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  paginationPageSize,
} from '@/src/widgets/users-list/table/model/pagination-config'
import { SortDirectionTable } from '@/src/widgets/users-list/table/model/table.types'
import {
  type ITableHead,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@meetgram/ui-kit'
import { dateFormatting } from '@meetgram/utils'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export const UserPayments = () => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const sortBy = searchParams.get(SORT_BY_PARAM_KEY) || paymentListTableHeaders[0].key
  const page = searchParams.get(PAGE_PARAM_KEY) || 1
  const params = new URLSearchParams(searchParams)

  const paramsId = useParams()
  const parsedUserId = paramsId?.id ? Number(paramsId.id) : null

  const { data } = useGet_User_PaymentsQuery({
    variables: {
      pageNumber: +page,
      pageSize: +itemsPerPage,
      sortBy,
      userId: parsedUserId!,
    },
  })

  const saveSearchParam = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnPageChange = (page: number) => {
    params.set(PAGE_PARAM_KEY, String(page))

    saveSearchParam()
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    params.set(PAGE_SIZE_PARAM_KEY, String(itemsPerPage))

    saveSearchParam()
  }

  const handleChangeSort = (header: ITableHead<paymentsListTableHeadKeysType>) => {
    const sortDirection =
      // eslint-disable-next-line no-nested-ternary
      sortBy === header.key
        ? sortDir === SortDirectionTable.DESC
          ? SortDirectionTable.ASC
          : SortDirectionTable.DESC
        : SortDirectionTable.ASC

    params.set(SORT_PARAM_KEY, String(sortDirection))
    params.set(SORT_BY_PARAM_KEY, header.key)

    saveSearchParam()
  }

  return (
    <>
      <div className={'mb-9'}>
        <Table>
          <TableHeader>
            <TableRow className={'has-[:hover]:border-0'}>
              {paymentListTableHeaders.map(header => (
                <TableHead
                  sort={sortBy === header.key ? sortDir : undefined}
                  onClick={() => handleChangeSort(header)}
                  key={header.id}
                  className={
                    'transition-colors hover:border-0 hover:shadow-sm hover:shadow-neutral-100/50'
                  }
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.getPaymentsByUser.items.map(payment => (
              <TableRow key={payment.id}>
                <TableCell className={'flex items-center gap-3'}>
                  <span>{dateFormatting(payment.dateOfPayment, { locale })}</span>
                </TableCell>
                <TableCell>{dateFormatting(payment.endDate, { locale })}</TableCell>
                <TableCell>{payment.payments.map(el => el.amount)}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.payments.map(el => el.paymentMethod)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className={'w-full md:w-1/2'}>
        {data?.getPaymentsByUser.items.length && (
          <Pagination
            currentPage={data?.getPaymentsByUser.page}
            pageCount={data?.getPaymentsByUser.pagesCount}
            onPageChange={handleOnPageChange}
            options={paginationPageSize}
            onPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </>
  )
}
