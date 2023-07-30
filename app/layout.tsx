import { Inter } from 'next/font/google'

import './globals.css'

export const metadata = {
  title: '101.school',
  description: 'Learn anything with 101 school',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-white/90 h-screen relative flex flex-col overflow-hidden scroll-smooth`}
      >
        {children}
      </body>
    </html>
  )
}
