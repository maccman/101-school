'use client'

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
      return
    }

    if (!userId) {
      router.push('/auth')
      return
    }

    await fetchEnroll(courseId)
  }

  return (
    <Button size="lg" onClick={handleClick} {...props}>
      {enrolled ? 'Enrolled' : 'Enroll in course'}
    </Button>
  )
}

function fetchEnroll(courseId: string) {
  return fetch(`/api/courses/${courseId}/enroll`, {
    method: 'POST',
  })
}