'use client'

import { useState } from 'react'

import { PostsList } from './PostsList'
import { PostsSearch } from './PostsSearch'

export const AllPosts = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <>
      <PostsSearch setSearchQuery={setSearchQuery} />
      <PostsList searchQuery={searchQuery ?? ''} />
    </>
  )
}
