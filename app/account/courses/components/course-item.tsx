'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    <div className="grid grid-cols-4 gap-5">
      {course.image?.source && (
        <div className="rounded-md overflow-hidden max-w-[500px]">
          <img
            src={course.image.source}
            alt={course.title}
            className="h-full w-full min-h-[20px] object-cover aspect-video transition-all hover:scale-105"
          />
        </div>
      )}

      <div className="text-lg">{course.title}</div>

      <div>
        {course.description && (
          <h4 className="text-sm" title={course.description}>
            {course.description}
          </h4>
        )}
      </div>

      <div className="gap-2 flex flex-col">
        <Link
          href={`/api/redirect/courses/${course.id}`}
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
        >
          View course
        </Link>

        <Button size="sm" variant="outline" onClick={() => handleUnEnroll()}>
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
