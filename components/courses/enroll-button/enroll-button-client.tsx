'use client'

import { CheckCircle, CircleDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

  const handleClick = async () => {
    if (enrolled) {
      router.push('/account/courses')
      return
    }

    if (!userId) {
      router.push('/auth')
      return
    }

    await fetchEnroll(courseId)

    router.refresh()
  }

  return (
    <Button
      size="lg"
      variant="default"
      onClick={handleClick}
      disabled={enrolled}
      {...props}
    >
      {enrolled ? (
        <CheckCircle className="w-4 h-4 mr-2" />
      ) : (
        <CircleDashed className="w-4 h-4 mr-2" />
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
