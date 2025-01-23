import { Button, Card, Input } from '@meetgram/ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSignIn } from '../lib/useSignIn'

export const SignInForm = () => {
  const {
    formState: { errors, isDirty, isValid, touchedFields },
    getValues,
    handleSubmit,
    register,
    setError,
    trigger,
  } = useSignIn()

  // useChangeZodErrorLang(touchedFields, fieldName => trigger(fieldName), [locale || 'en'])

  return (
    <Card className={'min-w-[22.5rem] p-6 text-regular16 text-light-100'}>
      <h2 className={'mb-3 text-center text-h1 font-bold'}>Sign In</h2>
      <form>
        <div className={'mb-9 flex flex-col gap-6'}>
          <Input
            error={errors.email?.message}
            label={'Email'}
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            type={'email'}
          />
          <Input
            error={errors.password?.message}
            label={'Password'}
            type={'password'}
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
        </div>
        <div className={'flex flex-col items-center gap-4'}>
          <Button disabled={!isDirty || !isValid} fullWidth type={'submit'} variant={'primary'}>
            {/*{signInLang.signIn}*/}
            Sign In
          </Button>
          {/*<p className={'text-regular16'}>{signInLang.anAccount}</p>*/}
        </div>
      </form>
    </Card>
  )
}
