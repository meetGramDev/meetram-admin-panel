'use client'

import { useEffect, useTransition } from 'react'

import { SortDirection } from '@/src/shared/api'
import { Spinner } from '@/src/shared/ui'
import { Loader } from '@meetgram/ui-kit'
import { useInfiniteScroll } from '@meetgram/utils'
import { useLocale } from 'next-intl'

import { OnNewPostDocument, type OnNewPostSubscription } from '../api/newPost.generated'
import { useGetPostsListsQuery } from '../api/posts.generated'
import { PostContainer } from './PostContainer'

export const PostsList = ({ searchQuery }: { searchQuery?: string }) => {
  const [isPending, startTransition] = useTransition()

  const locale = useLocale()

  const { data, fetchMore, loading, subscribeToMore } = useGetPostsListsQuery({
    variables: {
      endCursorPostId: 0,
      pageSize: 8,
      searchTerm: searchQuery ?? '',
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
    },
  })

  useEffect(() => {
    if (data) {
      const unsubscribe = subscribeToMore<OnNewPostSubscription>({
        document: OnNewPostDocument,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev
          }
          const newPost = subscriptionData.data.postAdded

          return Object.assign({}, prev, {
            items: [newPost, ...prev.getPosts.items],
          })
        },
      })

      return () => {
        unsubscribe()
      }
    }
  }, [data, subscribeToMore])

  const hasMoreItems = data?.getPosts.items?.length !== data?.getPosts.totalCount

  const { ref } = useInfiniteScroll(() => {
    startTransition(async () => {
      if (
        data?.getPosts.items &&
        data?.getPosts.items.length &&
        data?.getPosts.items.at(-1)?.id &&
        hasMoreItems
      ) {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev
            }

            return {
              getPosts: {
                ...fetchMoreResult.getPosts,
                items: [...prev.getPosts.items, ...fetchMoreResult.getPosts.items],
              },
            }
          },
          variables: {
            endCursorPostId: data.getPosts.items.at(-1)?.id,
          },
        })
      }
    }),
      { threshold: 0.3 }
  })

  if (loading) {
    return (
      <div className={'flex justify-center'}>
        <Spinner />
      </div>
    )
  }

  if (!data?.getPosts.items || data?.getPosts.items.length === 0) {
    return <p className={'text-center text-h1'}>No Posts</p>
  }

  //{subscriptionData && <PostContainer locale={locale} post={subscriptionData.postAdded} />}

  return (
    <div className={'flex justify-center'}>
      <div
        className={'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:w-fit lg:grid-cols-4'}
      >
        {data.getPosts.items.map(post => (
          <div key={post.id}>
            <PostContainer locale={locale} post={post} />
          </div>
        ))}
        {hasMoreItems && (
          <div ref={ref} className={'col-span-full mt-3 flex h-fit justify-center'}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}
