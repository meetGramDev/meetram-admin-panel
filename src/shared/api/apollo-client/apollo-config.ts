import { setContext } from '@apollo/client/link/context'

/**
 * Настройка headers для инициализации Apollo Client`а
 */
export const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      /* TODO: Хардкод */
      Authorization: `Basic YWRtaW5AZ21haWwuY29tOmFkbWlu`,
    },
  }
})
