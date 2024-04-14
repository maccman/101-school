import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CourseUnit } from '@/components/course-units/course-unit'
import { titlize } from '@/lib/titlize'
import { getCourseContext } from '@/server/helpers/params-getters'
import CourseSidebarLayout from '@/components/layouts/course-sidebar-layout'

export async function generateMetadata({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}): Promise<Metadata> {
  const { course, courseModule, courseUnit } = await getCourseContext(params)

  if (!course || !courseModule || !courseUnit) {
    return {
      title: '101.school',
      description: 'Teach yourself anything',
    }
  }

  return {
    title: `${courseModule.title} / ${courseUnit.title}`,
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

export default async function CourseModuleUnitPage({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}) {
  const { course, courseModule, courseUnit } = await getCourseContext(params)

  if (!course || !courseModule || !courseUnit) {
    return notFound()
  }

  return (
    <CourseSidebarLayout courseSlug={params.courseSlug}>
      <CourseUnit course={course} courseModule={courseModule} courseUnit={courseUnit} />
    </CourseSidebarLayout>
  )
}
