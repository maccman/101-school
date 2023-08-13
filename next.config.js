/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma', 'vscode-textmate'],
  },

  staticPageGenerationTimeout: 1000,

  redirects: async () => {
    return [
      {
        source: '/account',
        destination: '/account/courses',
        permanent: false,
      },
      {
        source: '/api/redirects/:path*',
        destination: '/api/redirect/:path*',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
