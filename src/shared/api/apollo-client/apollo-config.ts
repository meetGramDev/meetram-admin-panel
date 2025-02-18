import { setContext } from '@apollo/client/link/context'

/**
 * Настройка headers для инициализации Apollo Client`а
 */
export const authLink = setContext((_, { headers }) => {
  const email = localStorage.getItem('email')
  const password = localStorage.getItem('password')

  const basicToken = `Basic ${btoa(`${email}:${password}`)}`

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      /* TODO: Хардкод */
      Authorization: basicToken,
    },
  }
})
