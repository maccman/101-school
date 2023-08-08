import Link from 'next/link'

import { cn } from '@/plugins/utils'
import { auth } from '@/server/helpers/auth'
import { getPathForCourseUnit } from '@/server/helpers/links'

import { buttonVariants } from '../ui/button'

interface EditButtonProps {
  course: {
    slug: string
    ownerId: string
  }
  courseModule: {
    number: number
    title: string
  }
  courseUnit: {
    number: number
    title: string
  }
  className?: string
}

export async function EditButton({
  course,
  courseModule,
  courseUnit,
  className,
}: EditButtonProps) {
  const userId = await auth()

  if (!userId) {
    return null
  }

  if (course.ownerId !== userId) {
    return null
  }

  const linkHref =
    getPathForCourseUnit({
      course,
      courseModule,
      courseUnit,
    }) + '/edit'

  return (
    <Link
      href={linkHref}
      className={cn(buttonVariants({ variant: 'outline' }), className)}
    >
      Edit unit
    </Link>
  )
}
