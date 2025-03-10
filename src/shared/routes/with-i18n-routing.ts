import { createNavigation } from 'next-intl/navigation'

import { i18nConfig } from '../../app_layer/i18n/config'

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(i18nConfig)
