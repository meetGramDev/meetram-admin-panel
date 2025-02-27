'use client'
import { useTransition } from 'react'

import { type Get_User_PostsQuery } from '@/src/entities/post'
import { type QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client'
import { Loader } from '@meetgram/ui-kit'
import { cn, dateFormatting, useInfiniteScroll } from '@meetgram/utils'
import Image from 'next/image'

export const UserPosts = ({ queryRef }: { queryRef: QueryRef<Get_User_PostsQuery> }) => {
  const { fetchMore } = useQueryRefHandlers(queryRef)
  const { data } = useReadQuery(queryRef)
  const [isPending, startTransition] = useTransition()

  const hasMoreItems = data.getPostsByUser.items?.length !== data.getPostsByUser.totalCount

  const { ref } = useInfiniteScroll(
    () => {
      startTransition(async () => {
        if (
          data.getPostsByUser.items &&
          data.getPostsByUser.items.length &&
          data.getPostsByUser.items.at(-1)?.id &&
          hasMoreItems
        ) {
          await fetchMore({ variables: { endCursorId: data.getPostsByUser.items.at(-1)?.id } })
        }
      })
    },
    { threshold: 0.3 }
  )

  if (!data.getPostsByUser.items || data?.getPostsByUser.items.length === 0) {
    return <p className={'text-center text-h1'}>No posts</p>
  }

  return (
    <div className={'flex justify-center'}>
      <ul
        className={'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:w-fit lg:grid-cols-4'}
      >
        {data.getPostsByUser.items.map(post => (
          <li
            key={post.id}
            aria-disabled={isPending}
            className={cn(
              'relative justify-self-center before:absolute before:inset-0 sm:odd:justify-self-end sm:even:justify-self-start md:odd:justify-self-auto md:even:justify-self-auto',
              isPending
                ? 'animate-pulse before:bg-gradient-to-l before:from-slate-900 before:to-slate-900 before:opacity-50'
                : 'before:opacity-100'
            )}
          >
            <Image
              title={`Created at ${dateFormatting(post.createdAt)}`}
              src={post.url ?? ''}
              alt={'post image'}
              width={300}
              height={300}
            />
          </li>
        ))}
        {hasMoreItems && (
          <div ref={ref} className={'col-span-full mt-3 flex h-fit justify-center'}>
            <Loader />
          </div>
        )}
      </ul>
    </div>
  )
}
