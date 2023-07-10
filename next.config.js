/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma', 'vscode-textmate'],
  },

  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig
