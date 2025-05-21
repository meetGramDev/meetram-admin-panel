'use client'
import type { ComponentProps } from 'react'

import { DebounceSearch } from '@meetgram/ui-kit'

type Props = {} & ComponentProps<typeof DebounceSearch>

export const SearchBar = (props: Props) => {
  return <DebounceSearch {...props} />
}
