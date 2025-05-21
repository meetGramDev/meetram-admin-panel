'use client'
import type { GetPaymentsListQuery } from '../api/payments.generated'
import type { PaymentsListTableHeadKeysType } from '../model/table-headers.types'

import { isGraphQLError } from '@/src/shared/types'
import { DataTable, type TableColumn, paginationPageSize } from '@/src/widgets/table'
import { dateFormatting } from '@meetgram/utils'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { paymentMethodFunction } from '../lib/paymentMethodFunction'
import { subTypeFunction } from '../lib/subTypeFunction'
import { usePaymentsTable } from '../lib/usePaymentsListTable'
import noImg from './../../../shared/assets/img/no-image-placeholder.webp'

export type PaymentsListTableProps = {
  disabled?: boolean
  onError?: (error: string) => void
  searchQuery?: string
}

const PaymentsPaginationOptions = ['6', '10', '15', '20']

export const PaymentsListTable = (props: PaymentsListTableProps) => {
  const locale = useLocale()
  const t = useTranslations('payment-list-items-table-header')

  const {
    currentPage,
    data,
    error,
    handleChangeSorting,
    handleItemsPerPageChange,
    handleOnPageChange,
    itemsPerPage,
    loading,
    refetch,
    sortBy,
    sortDir,
  } = usePaymentsTable(props)

  const paymentsListTableColumns: TableColumn<
    GetPaymentsListQuery['getPayments']['items'][0],
    PaymentsListTableHeadKeysType
  >[] = [
    {
      id: 1,
      key: 'userName',
      label: t('Username'),
      render: user => (
        <div className={'flex items-center'}>
          <Image
            alt={'user-avatar'}
            src={user.avatars?.[0]?.url ?? noImg}
            width={45}
            height={45}
            className={'mr-3 rounded-full'}
          />
          <div className={'max-w-40 overflow-y-auto whitespace-pre-line text-wrap break-all'}>
            {user.userName}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      key: 'createdAt',
      label: t('Date added'),
      render: user => dateFormatting(user.createdAt, { locale }),
    },
    {
      id: 3,
      key: 'amount',
      label: t('Amount'),
      render: user => <div>{`${user.amount}$`}</div>,
    },
    {
      id: 4,
      key: 'type',
      label: t('Subscription'),
      render: user => <div>{subTypeFunction(user.type)}</div>,
    },
    {
      id: 5,
      key: 'paymentMethod',
      label: t('Payment method'),
      render: user => <div>{paymentMethodFunction(user.paymentMethod)}</div>,
    },
  ]

  return (
    <DataTable
      onErrorBtn={refetch}
      columns={paymentsListTableColumns}
      data={data?.getPayments.items || []}
      loading={loading}
      error={isGraphQLError(error) ? error.message : ''}
      sortBy={sortBy}
      sortDir={sortDir}
      onSortChange={handleChangeSorting}
      pagination={{
        currentPage: data?.getPayments.page ?? currentPage,
        pageCount: data?.getPayments.pagesCount ?? 0,
        perPage: String(data?.getPayments.pageSize) ?? itemsPerPage,
      }}
      paginationOptions={PaymentsPaginationOptions}
      onPageChange={handleOnPageChange}
      onPerPageChange={handleItemsPerPageChange}
      className={'mb-9'}
    />
  )
}
