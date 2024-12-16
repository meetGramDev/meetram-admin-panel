import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          100: '#73A5FF',
          300: '#4c8dff',
          500: '#397df6',
          700: '#2f68cc',
          900: '#234e99',
        },
        danger: {
          100: '#ff8099',
          300: '#f23d61',
          500: '#cc1439',
          700: '#990f2b',
          900: '#660a1d',
        },
        dark: {
          100: '#4c4c4c',
          300: '#333',
          500: '#171717',
          700: '#0d0d0d',
          900: '#000',
        },
        light: {
          100: '#fff',
          300: '#f7fbff',
          500: '#edf3fa',
          700: '#d5dae0',
          900: '#8d9094',
          1000: '#757575ff',
        },
        success: {
          100: '#80ffbf',
          300: '#22e584',
          500: '#14cc70',
          700: '#0f9954',
          900: '#0a6638',
        },
        warning: {
          100: '#ffd073',
          300: '#e5ac39',
          500: '#d99000',
          700: '#996600',
          900: '#664400',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: ['20px', '36px'],
        h2: ['18px', '24px'],
        large: ['26px', '36px'],
        regular14: ['14px', '24px'],
        regular16: ['16px', '24px'],
        small: ['12px', '16px'],
      },
    },
  },
  plugins: [],
} satisfies Config
