'use client'

import { useState } from 'react'

import { type SignInFields, SignInForm, useSignInMutation } from '@/src/features/auth/signIn'
import { apolloErrorsHandler } from '@/src/shared/lib'
import { USERS_LIST } from '@/src/shared/routes'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function SignInPage() {
  const t = useTranslations('error-messages')
  const [signIn] = useSignInMutation()
  const router = useRouter()
  const [error, setError] = useState('')
  const handleSubmitForm = async (data: SignInFields) => {
    try {
      localStorage.setItem('email', data.email)
      localStorage.setItem('password', data.password)

      const res = await signIn({
        variables: {
          email: data.email,
          password: data.password,
        },
      })

      if (res.data?.loginAdmin?.logged) {
        setCookie('logged', 'true', { maxAge: 60 * 60 * 24, path: '/' })
        router.push(USERS_LIST)
      } else {
        return setError(t('Incorrect email or password'))
      }
    } catch (error) {
      const err = apolloErrorsHandler(error)

      setError(err)
    }
  }

  return <SignInForm error={error} onSubmit={handleSubmitForm} />
}
