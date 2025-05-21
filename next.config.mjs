import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/app_layer/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        destination: '/users',
        permanent: true,
        source: '/',
      },
    ]
  },
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "globalThis.__DEV__": false,
      })
    );

    return config;
  },
}

export default withNextIntl(nextConfig)
