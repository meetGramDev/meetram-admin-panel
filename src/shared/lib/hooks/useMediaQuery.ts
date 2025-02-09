import { useEffect, useState } from 'react'

/**
 * Allows checking if the current window matches a CSS media query, such as `(max-width: 768px)`.
 * Work with SSR safety.
 * @param {string} query - The media query string to evaluate (e.g., '(max-width: 768px)').
 * @returns {Object} - An object containing:
 *   - {boolean} `matches`: Whether the current viewport matches the given media query.
 *   - {number|null} `windowWidth`: The current window width in pixels (null during SSR or before hydration)
 */
export function useMediaQuery(query: string) {
  const [isMatches, setMatches] = useState(false)
  const [windowWidth, setWindowWidth] = useState<null | number>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQueryList = window.matchMedia(query)

    const updateStates = () => {
      setMatches(mediaQueryList.matches)
      setWindowWidth(window.innerWidth)
    }

    // Set the initial state after hydration
    updateStates()

    window.addEventListener('resize', updateStates)
    mediaQueryList.addEventListener('change', updateStates)

    return () => {
      window.removeEventListener('resize', updateStates)
      mediaQueryList.removeEventListener('change', updateStates)
    }
  }, [query])

  return { isMatches, windowWidth }
}
