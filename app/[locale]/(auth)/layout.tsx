import { type PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className={'px-4 pt-[12rem] sm:pt-[15rem]'}>
      <div className={'flex w-full justify-center'}>{children}</div>
    </main>
  )
}
