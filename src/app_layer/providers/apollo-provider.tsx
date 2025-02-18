'use client'
import type { PropsWithChildren } from 'react'

import { authLink } from '@/src/shared/api/apollo-client/apollo-config'
import { BACKEND_GraphQL_BASE_URL } from '@/src/shared/config'
import {
  type GetUsersListQuery,
  type GetUsersListQueryVariables,
} from '@/src/widgets/users-list/table'
import { HttpLink } from '@apollo/client'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

/**
 *
 * Функция, которая инициализирует Apollo клиент для использования на клиенте (Client Components).
 *
 * Гарантирует, что все клиентские компоненты будут иметь доступ к одному и тому же экземпляру клиента Apollo,
 * совместно используемому через ApolloNextAppProvider.
 */
function makeClient() {
  // инициализация API baseUrl
  const httpLink = new HttpLink({
    // по желанию, здесь можно задизейблить кэш
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    // fetchOptions: { cache: 'no-store' },
    // на каждый query запрос можно переопределить дефолтное значение `fetchOptions`
    // через свойство `context` в объекте параметров, передаваемый вторым аргументом
    // в хук Apollo Client`а для запроса за данными, например:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
    uri: BACKEND_GraphQL_BASE_URL,
  })

  // Инициализация инстанса клиента Apollo
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getUsers: {
              keyArgs: ['statusFilter', 'searchTerm', 'pageNumber'],
              read(existing: GetUsersListQuery['getUsers'], options) {
                // возврат undefined сигнализирует о том, что Apollo Client
                // должен сделать запрос на GraphQL сервер
                if (!existing) {
                  return
                }

                const args: GetUsersListQueryVariables | null = options.args

                // при изменении page size в меньшую сторону обрезать массив пользователей
                if (args?.pageSize && existing.pagination.pageSize > args.pageSize) {
                  return {
                    ...existing,
                    pagination: {
                      ...existing.pagination,
                      pageSize: args.pageSize,
                      pagesCount: Math.ceil(existing.pagination.totalCount / args.pageSize),
                    },
                    users: existing.users.slice(0, args.pageSize),
                  }
                }

                // иначе инвалидировать кэш
                if (args?.pageSize && existing.pagination.pageSize < args.pageSize) {
                  return
                }

                return existing
              },
            },
          },
        },
      },
    }),
    // connectToDevTools: true,
    link: authLink.concat(httpLink),
  })
}

/**
 * Инициализация подключения apollo для работы с API
 */
export function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
