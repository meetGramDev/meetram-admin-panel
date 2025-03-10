import { useEffect } from 'react'

import { isErrorMessageString } from '@/src/shared/types/errorTypesPredicate'
import { Button, Card, Input } from '@meetgram/ui-kit'
import { useTranslations } from 'next-intl'

import { type SignInFields, useSignIn } from '../lib/useSignIn'

type Props = {
  error?: string
  onSubmit: (data: SignInFields) => void
}

export const SignInForm = ({ error, onSubmit }: Props) => {
  const t = useTranslations('auth')

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
    <Card className={'w-[23.7rem] p-6 text-base leading-6 text-white text-opacity-100'}>
      <h2 className={'mb-[2.31rem] text-center text-[20px] font-bold leading-[36px]'}>
        {t('Sign In')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex flex-col gap-[1.8rem]'}>
          <Input
            error={errors.email?.message}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            label={t('Email')}
            type={'email'}
          />
          <Input
            error={errors.password?.message}
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
            label={t('Password')}
            type={'password'}
          />
        </div>
        <Button
          disabled={!isDirty || !isValid}
          className={'mb-[0.75rem] mt-[2.25rem]'}
          fullWidth
          type={'submit'}
          variant={'primary'}
        >
          {t('Sign In')}
        </Button>
      </form>
    </Card>
  )
}
