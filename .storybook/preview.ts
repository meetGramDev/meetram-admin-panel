import type { Preview } from '@storybook/react'
import '../src/app/styles/globals.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#000000',
        },
        {
          name: 'white',
          value: '#fff',
        },
      ],
    },
  },
}

export default preview
