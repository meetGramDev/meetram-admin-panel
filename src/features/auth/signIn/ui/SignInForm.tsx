import type { ServerMessagesType } from '@/src/shared/api/types'

import { useEffect } from 'react'

import { isErrorMessageString } from '@/src/shared/types/errorTypesPredicate'
import { Button, Card, Input } from '@meetgram/ui-kit'

import s from './SignInForm.module.scss'

import { type SignInFields, useSignIn } from '../lib/useSignIn'

type Props = {
  error?: ServerMessagesType[] | string
  onSubmit: (data: SignInFields) => void
}

export const SignInForm = ({ error, onSubmit }: Props) => {
  const {
    formState: { errors, isDirty, isValid, touchedFields },
    getValues,
    handleSubmit,
    register,
    setError,
    trigger,
  } = useSignIn()

  useEffect(() => {
    if (isErrorMessageString(error)) {
      let field: keyof SignInFields

      for (field in getValues()) {
        setError(field, { message: error })
      }
    }
  }, [error, setError, getValues])

  return (
    <Card className={s.signInCard}>
      <h2 className={s.header}>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputContainer}>
          <Input
            error={errors.email?.message}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            label={'Email'}
            type={'email'}
          />
          <Input
            error={errors.password?.message}
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
            label={'Password'}
            type={'password'}
          />
        </div>
        <Button
          disabled={!isDirty || !isValid}
          className={s.button}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
          Sign In
        </Button>
      </form>
    </Card>
  )
}
