import { BACKEND_GraphQL_BASE_URL } from '@/src/shared/config'
import { ApolloLink, HttpLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support'

import { authLink } from './apollo-config'

const httpLink = new HttpLink({
  // по желанию, здесь можно задизейблить кэш
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  //fetchOptions: { cache: 'no-store' },
  // на каждый query запрос можно переопределить дефолтное значение `fetchOptions`
  // через свойство `context` в объекте параметров, передаваемый вторым аргументом
  // в хук Apollo Client`а для запроса за данными, например:
  // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  uri: BACKEND_GraphQL_BASE_URL,
})

const httpUri = 'https://inctagram.work/api/v1/graphql'
const wsUri = 'ws://inctagram.work/api/v1/graphql'

const wsLink = new WebSocketLink({
  options: {
    reconnect: true,
  },
  uri: wsUri,
})

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  new HttpLink({ uri: httpUri })
)

/**
 * Создаёт инстанс Apollo Client`а для использования в RSC и SSR
 */
export const { PreloadQuery, getClient, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(splitLink),
  })
})
