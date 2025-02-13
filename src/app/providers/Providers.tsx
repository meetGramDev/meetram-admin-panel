'use client'
import React, { type PropsWithChildren } from 'react'

import { client } from '@/apollo-client'
import { ApolloProvider } from '@apollo/client'

export const Providers = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
