/** THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import * as Types from '../../../../shared/api/models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type Delete_UserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type Delete_UserMutation = { __typename?: 'Mutation', removeUser: boolean };


export const Delete_UserDocument = gql`
    mutation DELETE_USER($userId: Int!) {
  removeUser(userId: $userId)
}
    `;
export type Delete_UserMutationFn = Apollo.MutationFunction<Delete_UserMutation, Delete_UserMutationVariables>;

/**
 * __useDelete_UserMutation__
 *
 * To run a mutation, you first call `useDelete_UserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_UserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDelete_UserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDelete_UserMutation(baseOptions?: Apollo.MutationHookOptions<Delete_UserMutation, Delete_UserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Delete_UserMutation, Delete_UserMutationVariables>(Delete_UserDocument, options);
      }
export type Delete_UserMutationHookResult = ReturnType<typeof useDelete_UserMutation>;
export type Delete_UserMutationResult = Apollo.MutationResult<Delete_UserMutation>;
export type Delete_UserMutationOptions = Apollo.BaseMutationOptions<Delete_UserMutation, Delete_UserMutationVariables>;