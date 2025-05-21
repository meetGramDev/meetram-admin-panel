import type { PropsWithChildren } from 'react'

export const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={
        'mx-4 mb-12 mt-[var(--header-desktop-height)] pt-6 sm:mx-3 lg:mb-0 lg:ml-[var(--sidebar-desktop-width)] lg:mr-0 lg:px-6 lg:py-[3.75rem]'
      }
    >
      {children}
    </main>
  )
}
