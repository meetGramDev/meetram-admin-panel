import { type PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className={'mt-[10rem] flex h-auto w-full justify-center px-4 sm:mt-[15rem]'}>
      {children}
    </main>
  )
}
