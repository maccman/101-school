'use client'

import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/plugins/utils'
import { CourseWithImage } from '@/server/db/courses/types'

export function CourseItem({ course }: { course: CourseWithImage }) {
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
          href={`/courses/${course.slug}`}
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
        >
          View course
        </Link>
      </div>
    </div>
  )
}
