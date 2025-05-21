'use client'

import { useState } from 'react'

import { SEARCH_PARAM_KEY } from '@/src/widgets/table'
import { useSearchParams } from 'next/navigation'

import { PostsList } from './PostsList'
import { PostsSearch } from './PostsSearch'

export const AllPosts = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const searchQuery = params.get(SEARCH_PARAM_KEY) ?? ''

  return (
    <>
      <PostsSearch />
      <PostsList searchQuery={searchQuery} />
    </>
  )
}
