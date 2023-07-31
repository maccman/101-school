'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { CourseCard } from '@/components/courses/course-card'
import { Button, buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { CourseWithImage } from '@/server/db/courses/types'

export function CourseItem({ course }: { course: CourseWithImage }) {
  const router = useRouter()

  async function handleUnEnroll() {
    await fetchUnEnroll(course.id)

    toast({
      title: 'Un-enrolled',
      description: `You have un-enrolled from '${course.title}'`,
    })

    router.refresh()
  }

  return (
    <div className="flex space-x-10">
      <CourseCard key={course.slug} course={course} />

      <div className="space-y-5">
        <Link
          href={`/api/redirect/courses/${course.id}`}
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          View course
        </Link>

        <Button size="lg" variant="destructive" onClick={() => handleUnEnroll()}>
          Un-enroll
        </Button>
      </div>
    </div>
  )
}

function fetchUnEnroll(courseId: string) {
  return fetch(`/api/courses/${courseId}/unenroll`, {
    method: 'POST',
  })
}
