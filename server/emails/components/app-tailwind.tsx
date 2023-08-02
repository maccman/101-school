import React from 'react'

import { Tailwind } from '@/server/helpers/react-email/tailwind'

export function AppTailwind({ children }: { children: React.ReactNode }) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              background: '#ffffff',
              foreground: '#010816',
              muted: '#f1f5f9',
              'muted-foreground': '#64748b',
              popover: '#ffffff',
              'popover-foreground': '#010816',
              card: '#ffffff',
              'card-foreground': '#010816',
              border: '#e2e8f0',
              input: '#e2e8f0',
              primary: '#4add80',
              'primary-foreground': '#13522c',
              secondary: '#f1f5f9',
              'secondary-foreground': '#0f172a',
              accent: '#f1f5f9',
              'accent-foreground': '#0f172a',
              destructive: '#ee4444',
              'destructive-foreground': '#f7f9fb',
              ring: '#94a3b7',
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  )
}
