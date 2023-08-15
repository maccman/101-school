'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'

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
  const headline = course.headline || course.description

  return (
    <Link href={`/courses/${course.slug}`} {...props}>
      <div className="space-y-2">
        <div className="rounded-md overflow-hidden max-w-[500px]">
          <Avatar>
            <AvatarImage
              src={course.image?.source}
              className="h-full w-full min-h-[150px] object-cover aspect-video transition-all hover:scale-105 bg-muted"
            />
            <AvatarFallback>
              <Skeleton className="min-h-[150px] w-full" />
            </AvatarFallback>
          </Avatar>
        </div>

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
