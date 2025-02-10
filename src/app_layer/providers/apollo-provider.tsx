'use client'
import type { PropsWithChildren } from 'react'

import { BACKEND_GraphQL_BASE_URL } from '@/src/shared/config'
import { HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

/**
 * Функция, которая инициализирует Apollo клиент.
 * Гарантирует, что все клиентские компоненты будут иметь доступ к одному и тому же экземпляру клиента Apollo,
 * совместно используемому через ApolloNextAppProvider.
 */
function makeClient() {
  // инициализация API baseUrl
  const httpLink = new HttpLink({
    // по желанию, здесь можно задизейблить кэш
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: 'no-store' },
    // на каждый query запрос можно переопределить дефолтное значение `fetchOptions`
    // через свойство `context` в объекте параметров, передаваемый вторым аргументом
    // в хук Apollo Client`а для запроса за данными, например:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
    uri: BACKEND_GraphQL_BASE_URL,
  })

  // Настройка headers запросов
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        /* TODO: Хардкод */
        Authorization: `Basic YWRtaW5AZ21haWwuY29tOmFkbWlu`,
      },
    }
  })

  // Инициализация инстанса клиента Apollo
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    // connectToDevTools: true,
  })
}

/**
 * Инициализация подключения apollo для работы с API
 */
export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
