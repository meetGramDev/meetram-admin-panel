import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { DataTable, SortDirectionTable } from './DataTable'

const meta = {
  component: DataTable,
  tags: ['autodocs'],
  title: 'widgets/DataTable',
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

const mockData = [
  {
    createdAt: new Date(),
    id: 1,
    username: 'Ivan',
  },
  {
    createdAt: new Date(),
    id: 2,
    username: 'Jonas',
  },
  {
    createdAt: new Date(),
    id: 3,
    username: 'Petya',
  },
  {
    createdAt: new Date(),
    id: 4,
    username: 'Petyaaaa',
  },
  {
    createdAt: new Date(),
    id: 5,
    username: 'Sasha',
  },
  {
    createdAt: new Date(),
    id: 6,
    username: 'Brother',
  },
  {
    createdAt: new Date(),
    id: 7,
    username: 'Susan',
  },
  {
    createdAt: new Date(),
    id: 8,
    username: 'Adam',
  },
  {
    createdAt: new Date(),
    id: 9,
    username: 'Greta',
  },
  {
    createdAt: new Date(),
    id: 10,
    username: 'Simon',
  },
]

const mockColumns = [
  {
    id: 1,
    key: 'id',
    label: 'User ID',
  },
  {
    id: 2,
    key: 'userName',
    label: 'Username',
    render: (user: (typeof mockData)[0]) => <div className={'font-bold'}>{user.username}</div>,
  },
  {
    id: 3,
    key: 'createdAt',
    label: 'Created At',
    render: (user: (typeof mockData)[0]) => new Date(user.createdAt).toLocaleDateString(),
  },
]

export const Default: Story = {
  args: {
    columns: [],
    data: [{ id: 0 }],
  },

  render: args => {
    const [currentPage, setPage] = useState(1)
    const [pageSize, setPageSize] = useState('5')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortDir, setSortDir] = useState<SortDirectionTable>(0)

    return (
      <DataTable
        pagination={{
          currentPage,
          pageCount: 2,
          perPage: pageSize,
        }}
        sortDir={sortDir}
        sortBy={sortBy}
        onPageChange={setPage}
        onPerPageChange={setPageSize}
        paginationOptions={['1', '3', '5']}
        onSortChange={newSortBy => {
          const newSortDir =
            sortBy === newSortBy && sortDir === SortDirectionTable.DESC
              ? SortDirectionTable.ASC
              : SortDirectionTable.DESC

          setSortDir(newSortDir)
          setSortBy(newSortBy)
        }}
        {...args}
        data={mockData}
        columns={mockColumns}
      />
    )
  },
}
