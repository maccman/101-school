import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CourseUnit } from '@/components/course-units/course-unit'
import { getAllUnits } from '@/server/db/units/getters'
import { getCourseContext } from '@/server/helpers/params-getters'
import { getSlug } from '@/server/helpers/slug'

export const dynamic = 'force-dynamic'

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
  }
}

export async function generateStaticParams() {
  const units = await getAllUnits()

  return units.map((unit) => ({
    params: {
      courseSlug: unit.courseSlug,
      moduleSlug: getSlug({ title: unit.moduleTitle, number: unit.moduleNumber }),
      unitSlug: getSlug(unit),
    },
  }))
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
    <CourseUnit
      courseId={course.id}
      courseModule={courseModule}
      courseUnit={courseUnit}
    />
  )
}
