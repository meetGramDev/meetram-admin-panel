'use client'

import type { PaymentsListTableHeadKeysType } from '../model/table-headers.types'

import {
  type Get_User_PaymentsQuery,
  useGet_User_PaymentsQuery,
} from '@/src/entities/user/api/get-user-payments/getUserPayments.generated'
import { isGraphQLError } from '@/src/shared/types'
import {
  DataTable,
  type TableColumn,
  paginationPageSize,
  useTableSorting,
} from '@/src/widgets/table'
import { dateFormatting } from '@meetgram/utils'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'

export const UserPayments = () => {
  const locale = useLocale()
  const paramsId = useParams()
  const parsedUserId = paramsId?.id ? Number(paramsId.id) : null

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

  const {
    currentPage,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    sortBy,
    sortDir,
    sortDirection,
  } = useTableSorting({ defaultSortBy: paymentListTableHeaders[0].key })

  const { data, error, loading } = useGet_User_PaymentsQuery({
    variables: {
      pageNumber: currentPage,
      pageSize: itemsPerPage,
      sortBy,
      sortDirection,
      userId: parsedUserId!,
    },
  })

  return (
    <DataTable
      columns={paymentListTableHeaders}
      data={data?.getPaymentsByUser.items || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : 'Some error. See logs.'}
      sortBy={sortBy}
      sortDir={sortDir}
      onSortChange={handleChangeSorting}
      pagination={data?.getPaymentsByUser}
      paginationOptions={paginationPageSize}
      onPageChange={handleOnPageChange}
      onPerPageChange={handleItemsPerPageChange}
      className={'mb-9'}
    />
  )
}
