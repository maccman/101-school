'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Skeleton } from '../ui/skeleton'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  course: {
    slug: string
    title: string
    headline: string
    description: string
    image: { source: string } | null
  }
}

export function CourseCard({ course, ...props }: Props) {
  const [imageError, setImageError] = useState(false)

  const headline = course.headline || course.description

  const imageSrc = imageError ? null : course.image?.source

  return (
    <Link href={`/courses/${course.slug}`} {...props}>
      <div className="space-y-2">
        {imageSrc ? (
          <div className="rounded-md overflow-hidden max-w-[500px]">
            <img
              src={imageSrc}
              alt={course.title}
              className="h-full w-full min-h-[20px] object-cover aspect-video transition-all hover:scale-105 bg-muted"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <Skeleton className="h-20 w-full" />
        )}

        <div>
          <h3 className="truncate font-medium tracking-tight">{course.title}</h3>
          {headline && (
            <h4 className="text-sm text-muted-foreground truncate" title={headline}>
              {headline}
            </h4>
          )}
        </div>
      </div>
    </Link>
  )
}
