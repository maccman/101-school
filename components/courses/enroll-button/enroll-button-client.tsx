'use client'

import { CheckCircle, CircleDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button, ButtonProps } from '../../ui/button'

interface EnrollButtonProps extends ButtonProps {
  userId: string | null
  courseId: string
  enrolled: boolean
}

export function EnrollButtonClient({
  courseId,
  enrolled,
  userId,
  ...props
}: EnrollButtonProps) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    if (pending) {
      return
    }

    if (enrolled) {
      router.push('/account/courses')
      return
    }

    if (!userId) {
      router.push('/auth')
      return
    }

    setPending(true)

    await fetchEnroll(courseId)

    router.refresh()
  }

  return (
    <Button
      size="lg"
      variant="default"
      onClick={handleClick}
      disabled={enrolled || pending}
      {...props}
    >
      {enrolled ? (
        <CheckCircle className="w-4 h-4 mr-2" />
      ) : (
        <CircleDashed className={cn('w-4 h-4 mr-2', { 'animate-spin': pending })} />
      )}
      {enrolled ? 'Enrolled' : 'Enroll in course'}
    </Button>
  )
}

function fetchEnroll(courseId: string) {
  return fetch(`/api/courses/${courseId}/enroll`, {
    method: 'POST',
  })
}
