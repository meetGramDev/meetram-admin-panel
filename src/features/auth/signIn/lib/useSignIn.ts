import { useForm } from 'react-hook-form'

import {
  getEmailConstraint,
  getPasswordSignInConstraint,
} from '@/src/shared/const/validationFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const getSignInSchema = () => {
  return z.object({
    email: getEmailConstraint(),
    password: getPasswordSignInConstraint(),
  })
}

const signInSchema = getSignInSchema()

export type SignInFields = z.infer<typeof signInSchema>

export function useSignIn() {
  const { formState, getValues, handleSubmit, register, setError, trigger } = useForm<SignInFields>(
    {
      defaultValues: { email: '', password: '' },
      mode: 'onBlur',
      reValidateMode: 'onChange',
      resolver: zodResolver(getSignInSchema()),
    }
  )

  return { formState, getValues, handleSubmit, register, setError, trigger }
}
