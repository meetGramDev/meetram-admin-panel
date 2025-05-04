import { Suspense } from 'react'

import { AllPosts } from '@/src/pages_layer/posts-list/ui/AllPosts'
import { PostsList } from '@/src/pages_layer/posts-list/ui/PostsList'
import { ErrorBoundary } from '@/src/shared/ui'
import { Loader } from '@meetgram/ui-kit'

export default function Page() {
  return (
    <div>
      <ErrorBoundary
        fallback={<p className={'text-center text-h1 text-danger-500'}>Something went wrong</p>}
      >
        <Suspense
          fallback={
            <div className={'flex justify-center'}>
              <Loader />
            </div>
          }
        >
          <AllPosts />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
