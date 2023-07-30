'use client'

import dynamic from 'next/dynamic'

export const AccountAuth = dynamic(() => import('./account-auth'), { ssr: false })
