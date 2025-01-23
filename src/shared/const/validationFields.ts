import { z } from 'zod'

// import { ErrorEmail, ErrorValidationFields } from '../../../dictionaries/en.json'

const maxChar = 'Maximum number of characters'
const minChar = 'Minimum number of characters'
const passContain = 'Password must contain'
// const wrongUsername = 'Wrong username'
const errorEmail = 'Invalid email'

export const getEmailConstraint = () => {
  return z.string().email({ message: errorEmail && errorEmail })
}

export const getPasswordConstraint = () => {
  return z
    .string()
    .trim()
    .min(6, { message: `${minChar} 6` })
    .max(20, { message: `${maxChar} 20` })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]{6,}$/,
      // errorValidationFields
      //   ? errorValidationFields.passContain +
      ' a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      // : passContain +
      //     ' a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
    )
}

export const getPasswordSignInConstraint = () => {
  return z
    .string()
    .trim()
    .min(6, { message: `${minChar} 6` })
    .max(20, { message: `${maxChar} 20` })
}
