import type { Config } from 'tailwindcss'

import config from '@meetgram/tailwind-config'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  presets: [config],
} satisfies Config
