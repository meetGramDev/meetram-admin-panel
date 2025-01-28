import type { PropsWithChildren } from 'react'

export const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <main className={'ml-[var(--sidebar-desktop-width)] mt-[var(--header-desktop-height)] p-6'}>
      {children}
    </main>
  )
}
