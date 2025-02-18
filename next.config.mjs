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
        source: '/',
        destination: '/users',
        permanent: true,
      }
    ]
  }
}

export default nextConfig
