//src/app/providers.tsx
'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apolloClient'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

