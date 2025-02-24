import { query } from '@/src/shared/api/apollo-client'

import {
  Get_User_ProfileDocument,
  type Get_User_ProfileQuery,
  type Get_User_ProfileQueryVariables,
} from './getUserProfile.generated'

export async function getUserProfileRSC(
  id: number
): Promise<{ data?: Get_User_ProfileQuery['getUser']; error?: string }> {
  try {
    const { data } = await query<Get_User_ProfileQuery, Get_User_ProfileQueryVariables>({
      query: Get_User_ProfileDocument,
      variables: { userId: id },
    })

    // TODO: log dev mode only
    console.log('🟢 RSC: ', data)

    return { data: data.getUser, error: '' }
  } catch (error) {
    console.error('💥 Error when getting user profile', error)

    return { error: 'Error when getting user profile' }
  }
}
