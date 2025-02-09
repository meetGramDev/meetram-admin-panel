'use client'
import type { ServerMessagesType } from '@/src/shared/api/types'

import { useState } from 'react'

import { type SignInFields, SignInForm } from '@/src/features/auth/signIn'
import { useSignInMutation } from '@/src/queries/sign-in/signIn.generated'
import { ALL_POSTS } from '@/src/shared/routes'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [signIn, { loading }] = useSignInMutation()
  const [error, setError] = useState<ServerMessagesType[] | string>('')
  const router = useRouter()

  const handleSubmitForm = async (data: SignInFields) => {
    try {
      setError('')

      const res = await signIn({
        variables: {
          email: data.email,
          password: data.password,
        },
      })

      if (res.data?.loginAdmin?.logged) {
        setCookie('logged', 'true', { maxAge: 60 * 60 * 24, path: '/' })
        router.push(ALL_POSTS) // router.push(USERS_LIST)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return 'Loading...'
  }

  return <SignInForm error={error} onSubmit={handleSubmitForm} />
}
