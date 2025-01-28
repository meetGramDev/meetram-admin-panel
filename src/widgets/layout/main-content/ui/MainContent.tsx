import type { PropsWithChildren } from 'react'

export const MainContent = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={
        'mx-4 mb-12 mt-[var(--header-desktop-height)] pt-6 sm:mx-3 md:mb-0 md:ml-[var(--sidebar-desktop-width)] md:mr-0 md:px-6 md:py-[3.75rem]'
      }
    >
      {children}
    </main>
  )
}
