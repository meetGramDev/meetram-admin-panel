import { Table, TableBody, TableCell, TableHeader, TableRow } from '@meetgram/ui-kit'

export const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Profile link</TableCell>
          <TableCell>Date created</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <SkeletonCell />
            </TableCell>
            <TableCell>
              <SkeletonCell />
            </TableCell>
            <TableCell>
              <SkeletonCell />
            </TableCell>
            <TableCell>
              <SkeletonCell />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const SkeletonCell = () => {
  return <div className={'h-5 max-w-full animate-pulse rounded-md bg-dark-100'}></div>
}
