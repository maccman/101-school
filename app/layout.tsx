import './globals.css'

import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: '101.school',
  description: 'Teach yourself anything.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
        {children}

        <Toaster />
      </body>
    </html>
  )
}
