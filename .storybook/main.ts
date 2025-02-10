import type { StorybookConfig } from '@storybook/nextjs'
import path from "path";
import { webpack } from 'next/dist/compiled/webpack/webpack'
import Configuration = webpack.Configuration

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],

  webpackFinal: async (config: Configuration) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')

    return config
  },
}
export default config
