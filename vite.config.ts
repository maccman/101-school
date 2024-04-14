import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    mode: 'test',
    plugins: [react()],

    // All environment variable prefixes that should be exposed to the testing environment.
    envPrefix: ['NEXT_PUBLIC_', 'VITE_PUBLIC_', 'ANTHROPIC_'],

    test: {
      environment: 'jsdom',
      alias: {
        app: '/app',
        '@/app': '/app',
        lib: '/lib',
        '@/lib': '/lib',
        server: '/server',
        '@/server': '/server',
        components: '/components',
        '@/components': '/components',
      },
      globals: true,
    },
  }
})
