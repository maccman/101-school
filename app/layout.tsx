import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { baseUrl } from '@/server/helpers/base-url'

export const metadata: Metadata = {
  title: '101.school',
  description: 'Teach yourself anything.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: [`${baseUrl}/static/logo.png`],
  twitter: {
    title: '101.school',
    description: 'Teach yourself anything.',
  },
}

export const runtime = 'edge'
export const preferredRegion = 'iad1'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background font-sans antialiased md:h-screen relative md:flex md:flex-col md:overflow-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}

          <Toaster />
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
