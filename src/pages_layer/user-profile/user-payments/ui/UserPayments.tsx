'use client'

import type { PaymentsListTableHeadKeysType } from '../model/table-headers.types'

import {
  type Get_User_PaymentsQuery,
  useGet_User_PaymentsQuery,
} from '@/src/entities/user/api/get-user-payments/getUserPayments.generated'
import { usePathname, useRouter } from '@/src/shared/routes'
import { isGraphQLError } from '@/src/shared/types'
import { DataTable, SortDirectionTable, type TableColumn } from '@/src/widgets/table'
import {
  PAGE_PARAM_KEY,
  PAGE_SIZE_PARAM_KEY,
  SORT_BY_PARAM_KEY,
  SORT_PARAM_KEY,
  paginationPageSize,
} from '@/src/widgets/table/const/pagination-config'
import { dateFormatting } from '@meetgram/utils'
import { useParams, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

export const UserPayments = () => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const itemsPerPage = searchParams.get(PAGE_SIZE_PARAM_KEY) || paginationPageSize[1]
  const sortDirParam = searchParams.get(SORT_PARAM_KEY)
  const sortDir = sortDirParam ? +sortDirParam : SortDirectionTable.DESC
  const sortBy = searchParams.get(SORT_BY_PARAM_KEY) || 'createdAt'
  const page = searchParams.get(PAGE_PARAM_KEY) || 1
  const params = new URLSearchParams(searchParams)

  const paramsId = useParams()
  const parsedUserId = paramsId?.id ? Number(paramsId.id) : null

  const { data, error, loading } = useGet_User_PaymentsQuery({
    variables: {
      pageNumber: +page,
      pageSize: +itemsPerPage,
      sortBy,
      userId: parsedUserId!,
    },
  })

  const saveSearchParams = () => {
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleOnPageChange = (page: number) => {
    params.set(PAGE_PARAM_KEY, String(page))
    saveSearchParams()
  }

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    params.set(PAGE_SIZE_PARAM_KEY, String(itemsPerPage))
    saveSearchParams()
  }

  const handleChangeSort = (column: string) => {
    const sortDirection =
      // eslint-disable-next-line no-nested-ternary
      sortBy === column
        ? sortDir === SortDirectionTable.DESC
          ? SortDirectionTable.ASC
          : SortDirectionTable.DESC
        : SortDirectionTable.ASC

    params.set(SORT_PARAM_KEY, String(sortDirection))
    params.set(SORT_BY_PARAM_KEY, column)

    saveSearchParams()
  }

  const paymentListTableHeaders: TableColumn<
    Get_User_PaymentsQuery['getPaymentsByUser']['items'][0],
    PaymentsListTableHeadKeysType
  >[] = [
    {
      id: 1,
      key: 'createdAt',
      label: 'Date of Payment',
      render: payment => (
        <div className={'flex items-center gap-3'}>
          <span>{dateFormatting(payment.dateOfPayment, { locale })}</span>
        </div>
      ),
    },
    {
      id: 2,
      key: 'endDate',
      label: 'End date of subscription',
      render: payment => dateFormatting(payment.endDate, { locale }),
    },
    {
      id: 3,
      key: 'amount',
      label: 'Amount, $',
      render: payment => payment.payments.map(el => el.amount),
    },
    { id: 4, key: 'type', label: 'Subscription Type', render: payment => payment.type },
    {
      id: 5,
      key: 'paymentMethod',
      label: 'Payment Type',
      render: payment => payment.payments.map(el => el.paymentMethod),
    },
  ]

  return (
    <DataTable
      columns={paymentListTableHeaders}
      data={data?.getPaymentsByUser.items || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : 'Some error. See logs.'}
      sortBy={sortBy}
      sortDir={sortDir}
      onSortChange={handleChangeSort}
      pagination={data?.getPaymentsByUser}
      paginationOptions={paginationPageSize}
      onPageChange={handleOnPageChange}
      onPerPageChange={handleItemsPerPageChange}
      className={'mb-9'}
    />
  )
}
