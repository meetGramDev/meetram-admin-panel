'use client'
import { useGet_User_PostsSuspenseQuery } from '@/src/entities/post'
import { dateFormatting } from '@meetgram/utils'
import Image from 'next/image'

export const UserPosts = ({ userId }: { userId: string }) => {
  const { data, error } = useGet_User_PostsSuspenseQuery({ variables: { userId: +userId } })

  if (!data?.getPostsByUser || data?.getPostsByUser.items?.length === 0) {
    return <p className={'text-center text-h1'}>No posts</p>
  }

  if (error) {
    return <p className={'text-center text-h1 text-danger-500'}>{error.message}</p>
  }

  return (
    <div className={'flex justify-center'}>
      <ul className={'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:w-fit'}>
        {data?.getPostsByUser.items?.map(post => (
          <li
            key={post.id}
            className={
              'justify-self-center sm:odd:justify-self-end sm:even:justify-self-start md:odd:justify-self-auto md:even:justify-self-auto'
            }
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
      </ul>
    </div>
  )
}
