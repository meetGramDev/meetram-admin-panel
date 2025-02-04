'use client'
import { DebounceSearch } from '@meetgram/ui-kit'

export const SearchBar = () => {
  return <DebounceSearch onValueQuery={value => console.log(value)} />
}
