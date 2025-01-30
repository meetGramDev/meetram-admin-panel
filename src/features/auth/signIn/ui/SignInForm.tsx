import { Button, Card, Input } from '@meetgram/ui-kit'

import s from './SignInForm.module.scss'

export const SignInForm = () => {
  return (
    <Card className={s.signInCard}>
      <h2 className={s.header}>Sign In</h2>
      <form>
        <div className={s.inputContainer}>
          <Input label={'Email'} type={'email'} />
          <Input label={'Password'} type={'password'} />
        </div>
        <Button className={s.button} fullWidth type={'submit'} variant={'primary'}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
