import { z } from 'zod'

const maxChar = 'Maximum number of characters'
const minChar = 'Minimum number of characters'
const passContain = 'Password must contain'
// const wrongUsername = 'Wrong username'
const errorEmail = 'Invalid email'

export const getEmailConstraint = () => {
  return z.string().email({ message: errorEmail && errorEmail })
}

export const getPasswordSignInConstraint = () => {
  return z
    .string()
    .trim()
    .min(5, { message: `${minChar} 5` })
    .max(20, { message: `${maxChar} 20` })
}
