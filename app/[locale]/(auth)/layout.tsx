import { type PropsWithChildren } from 'react'

import { MainContent } from '@/src/widgets/layout'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className={'mt-[-3rem] flex min-h-screen items-center justify-center px-4'}>
      {children}
    </main>
  )
}
