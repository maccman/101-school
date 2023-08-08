import { Metadata } from 'next'
import { ReactNode, Suspense } from 'react'

import { CourseSidebar } from '@/components/course-sidebar'
import CourseSidebarWithEnrollment from '@/components/course-sidebar/course-sidebar-with-enrollment'
import { HeaderLayout } from '@/components/layouts/header-layout'
import { titlize } from '@/lib/titlize'
import {
  getCourseBySlugOrId,
  getCourseUnitsMap,
  getFirstCourseUnit,
} from '@/server/db/courses/getters'

import { CourseGenerating } from './components/course-generating'

export async function generateMetadata({
  params,
}: {
  params: { courseSlug: string }
}): Promise<Metadata> {
  const course = await getCourseBySlugOrId(params.courseSlug)

  if (!course) {
    return {
      title: '101.school',
      description: 'Teach yourself anything',
    }
  }

  const courseUnit = await getFirstCourseUnit(course.id)

  return {
    title: `${course.title} - 101.school`,
    description: course.description,
    openGraph: {
      title: `${course.title} - 101.school`,
      description: course.description,
      images: courseUnit?.image
        ? [
            {
              url: courseUnit.image.source,
              alt: titlize(courseUnit.image.description ?? courseUnit.title),
            },
          ]
        : [],
    },
    twitter: {
      title: `${course.title} - 101.school`,
      description: course.description,
      card: 'summary_large_image',
      images: courseUnit?.image ? [courseUnit.image.source] : [],
    },
  }
}

export default async function CourseShowLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { courseSlug: string }
}) {
  const course = await getCourseBySlugOrId(params.courseSlug)

  if (!course) {
    console.warn(`Course with slug "${params.courseSlug}" not found`)
    return null
  }

  const courseUnits = await getCourseUnitsMap(course.id)

  if (!course.generatedAt || courseUnits.size === 0) {
    return <CourseGenerating />
  }

  return (
    <HeaderLayout courseId={course.id}>
      <div className="md:flex-1 md:overflow-hidden md:flex">
        <Suspense
          fallback={
            <CourseSidebar
              course={course}
              courseUnits={courseUnits}
              className="md:w-1/4 md:min-w-[300px] md:max-w-[400px] md:flex-none"
            />
          }
        >
          <CourseSidebarWithEnrollment
            course={course}
            courseUnits={courseUnits}
            className="md:w-1/4 md:min-w-[300px] md:max-w-[400px] md:flex-none"
          />
        </Suspense>

        <div className="md:flex-1 md:border-l flex">{children}</div>
      </div>
    </HeaderLayout>
  )
}
