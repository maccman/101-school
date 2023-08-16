'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

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

export function CourseCard({ course, className, ...props }: Props) {
  const headline = course.headline || course.description

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn('flex flex-col space-y-2', className)}
      {...props}
    >
      <div className="rounded-md overflow-hidden max-w-[500px] min-h-[150px] flex-1 flex flex-col relative bg-muted">
        {course.image?.source ? (
          <Image
            alt={course.title}
            src={course.image?.source}
            fill={true}
            className=" object-cover aspect-video transition-all hover:scale-105"
            priority
          />
        ) : null}
      </div>

      <div className="flex-none">
        <h3 className="truncate font-medium tracking-tight">{course.title}</h3>
        {headline && (
          <h4 className="text-sm text-muted-foreground truncate" title={headline}>
            {headline}
          </h4>
        )}
      </div>
    </Link>
  )
}
