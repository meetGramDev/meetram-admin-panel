/** THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import * as Types from '../../../../shared/api/models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Get_User_PaymentsQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  userId: Types.Scalars['Int']['input'];
}>;


export type Get_User_PaymentsQuery = { __typename?: 'Query', getPaymentsByUser: { __typename?: 'PaymentPaginationModel', pageSize: number, page: number, totalCount: number, pagesCount: number, items: Array<{ __typename?: 'SubscriptionByPaymentModel', id: string, businessAccountId: number, dateOfPayment?: any | null, endDate?: any | null, type: Types.SubscriptionType, paymentType?: Types.PaymentMethod | null, price: number, startDate?: any | null, status: Types.StatusSubscriptionType, payments: Array<{ __typename?: 'Payment', endDate?: any | null, id?: number | null, userId?: number | null, createdAt?: any | null, amount?: number | null, currency?: Types.CurrencyType | null, paymentMethod?: Types.PaymentMethod | null, type?: Types.SubscriptionType | null }> }> } };


export const Get_User_PaymentsDocument = gql`
    query GET_USER_PAYMENTS($pageNumber: Int = 1, $sortDirection: SortDirection = desc, $sortBy: String = "createdAt", $pageSize: Int = 10, $userId: Int!) {
  getPaymentsByUser(
    pageSize: $pageSize
    sortDirection: $sortDirection
    sortBy: $sortBy
    pageNumber: $pageNumber
    userId: $userId
  ) {
    pageSize
    page
    totalCount
    pagesCount
    items {
      id
      businessAccountId
      dateOfPayment
      endDate
      type
      paymentType
      price
      startDate
      status
      payments {
        endDate
        id
        userId
        createdAt
        amount
        currency
        paymentMethod
        type
      }
    }
  }
}
    `;

/**
 * __useGet_User_PaymentsQuery__
 *
 * To run a query within a React component, call `useGet_User_PaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_User_PaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_User_PaymentsQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      sortDirection: // value for 'sortDirection'
 *      sortBy: // value for 'sortBy'
 *      pageSize: // value for 'pageSize'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGet_User_PaymentsQuery(baseOptions: Apollo.QueryHookOptions<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables> & ({ variables: Get_User_PaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables>(Get_User_PaymentsDocument, options);
      }
export function useGet_User_PaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables>(Get_User_PaymentsDocument, options);
        }
export function useGet_User_PaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables>(Get_User_PaymentsDocument, options);
        }
export type Get_User_PaymentsQueryHookResult = ReturnType<typeof useGet_User_PaymentsQuery>;
export type Get_User_PaymentsLazyQueryHookResult = ReturnType<typeof useGet_User_PaymentsLazyQuery>;
export type Get_User_PaymentsSuspenseQueryHookResult = ReturnType<typeof useGet_User_PaymentsSuspenseQuery>;
export type Get_User_PaymentsQueryResult = Apollo.QueryResult<Get_User_PaymentsQuery, Get_User_PaymentsQueryVariables>;