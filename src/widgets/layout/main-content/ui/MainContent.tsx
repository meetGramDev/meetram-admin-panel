import type { PropsWithChildren } from 'react'

export const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={
        'ml-[var(--sidebar-desktop-width)] mt-[var(--header-desktop-height)] px-6 py-[3.75rem]'
      }
    >
      {children}
    </main>
  )
}
