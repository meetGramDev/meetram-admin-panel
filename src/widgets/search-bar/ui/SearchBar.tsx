'use client'
import { DebounceSearch } from '@meetgram/ui-kit'

type Props = {
  onValueQuery: (value: string) => void
  value?: string
}

export const SearchBar = ({ onValueQuery, value }: Props) => {
  return <DebounceSearch onValueQuery={onValueQuery} />
}
