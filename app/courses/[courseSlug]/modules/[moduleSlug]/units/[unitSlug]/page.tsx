import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { getCourseContext } from '@/server/helpers/params-getters'

export async function generateMetadata({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}): Promise<Metadata> {
  const { course, courseModule, courseUnit } = await getCourseContext(params)

  if (!course || !courseModule || !courseUnit) {
    return {
      title: '101.school',
      description: 'Learn anything',
    }
  }

  return {
    title: `${courseModule.title} / ${courseUnit.title}`,
    description: course.description,
  }
}

export default async function CoursePage({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}) {
  const { course, courseModule, courseUnit } = await getCourseContext(params)

  if (!course || !courseModule || !courseUnit) {
    return notFound()
  }

  return (
    <div className="px-10 py-5">
      <h3 className="text-base tracking-tight pb-5 text-accent-foreground">
        {courseModule.title}
      </h3>

      {courseUnit.image && <UnitImage image={courseUnit.image} className="float-right" />}

      {courseUnit.content && <UnitContent content={courseUnit.content} />}
    </div>
  )
}
