'use client'
import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

NProgress.configure({
  minimum: 0.2,
  speed: 300,
})

export function useProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
    const timeout = setTimeout(NProgress.done, 500)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])
}
