import type { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from '@/src/features/auth/signIn'
import { fn } from '@storybook/test'

const meta = {
  args: {},
  component: SignInForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'features/auth/SignInForm',
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}
