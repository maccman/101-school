'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function TryAgainButton() {
  const searchParams = useSearchParams()
  const courseId = searchParams?.get('courseId')

  if (!courseId) {
    return null
  }

  return (
    <Link
      href={`/api/courses/${courseId}/checkout`}
      className={cn(buttonVariants({ variant: 'outline' }))}
    >
      Try again...
    </Link>
  )
}
