'use client'

import dynamic from 'next/dynamic'

export const AccountProfile = dynamic(() => import('./account-profile'), { ssr: false })
