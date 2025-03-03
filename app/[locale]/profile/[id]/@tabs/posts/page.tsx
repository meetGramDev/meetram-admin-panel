import { Suspense } from 'react'

import {
  Get_User_PostsDocument,
  type Get_User_PostsQuery,
  type Get_User_PostsQueryVariables,
} from '@/src/entities/post'
import { UserPosts } from '@/src/pages_layer/user-profile/posts'
import { PreloadQuery } from '@/src/shared/api/apollo-client'
import { ErrorBoundary } from '@/src/shared/ui'
import { ProfileTabValues } from '@/src/widgets/tabs'
import { Loader, TabContent } from '@meetgram/ui-kit'

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <TabContent value={ProfileTabValues.posts}>
      <ErrorBoundary
        fallback={<p className={'text-center text-h1 text-danger-500'}>Something went wrong</p>}
      >
        <PreloadQuery<Get_User_PostsQuery, Get_User_PostsQueryVariables>
          query={Get_User_PostsDocument}
          variables={{ userId: +id }}
        >
          {queryRef => (
            <Suspense
              fallback={
                <div className={'flex justify-center'}>
                  <Loader />
                </div>
              }
            >
              <UserPosts queryRef={queryRef} />
            </Suspense>
          )}
        </PreloadQuery>
      </ErrorBoundary>
    </TabContent>
  )
}
