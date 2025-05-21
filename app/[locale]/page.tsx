import type { Locale } from '@/src/app_layer/i18n'

import { USERS_LIST, redirect } from '@/src/shared/routes'

export default function RootPage({ params: { locale } }: { params: { locale: Locale } }) {
  return redirect({ href: `/${USERS_LIST}`, locale })
}
