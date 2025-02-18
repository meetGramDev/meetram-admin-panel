import { type PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className={'flex min-h-[100dvh] items-center justify-center px-4 sm:mt-[-3rem]'}>
      {children}
    </main>
  )
}
