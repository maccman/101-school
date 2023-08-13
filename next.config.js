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
    ]
  },

  rewrites: async () => {
    return [
      // Alias for plural route
      {
        source: '/api/redirects/:path*',
        destination: '/api/redirect/:path*',
      },
    ]
  },
}

module.exports = nextConfig
