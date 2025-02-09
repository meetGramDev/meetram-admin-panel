import { gql } from '@apollo/client'

export const SIGN_IN = gql(/* GraphQL */ `
  mutation signIn($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`)
