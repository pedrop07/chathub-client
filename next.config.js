/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/sign(.*)',
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'auth-token',
  //         }
  //       ],
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
