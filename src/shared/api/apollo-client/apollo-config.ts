import { setContext } from '@apollo/client/link/context'

/**
 * Настройка headers для инициализации Apollo Client`а
 */
export const authLink = setContext((_, { headers }) => {
  let basicToken: string = ''

  if (typeof localStorage === 'undefined') {
    basicToken = `Basic ${Buffer.from('admin@gmail.com:admin', 'utf-8').toString('base64')}`
  } else {
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')

    basicToken = `Basic ${btoa(`${email}:${password}`)}`
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      /* TODO: Хардкод */
      Authorization: basicToken,
    },
  }
})
