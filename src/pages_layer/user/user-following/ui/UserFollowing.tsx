'use client'

import { followersListTableHeaders } from '@/src/widgets/users-list/table/const/users-list-table-headers'
import { Table, TableBody, TableHead, TableRow } from '@meetgram/ui-kit'

export const UserFollowing = () => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {followersListTableHeaders.map(header => (
              <TableHead
                className={
                  'transition-colors hover:border-0 hover:shadow-sm hover:shadow-neutral-100/50'
                }
                key={header.id}
              >
                {header.label}
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </div>
  )
}
