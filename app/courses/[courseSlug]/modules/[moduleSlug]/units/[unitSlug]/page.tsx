import { notFound } from 'next/navigation'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { getCourseContext } from '@/server/helpers/params-getters'

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
    <div>
      <p>{courseUnit.title}</p>

      {courseUnit.image && <UnitImage image={courseUnit.image} />}

      {courseUnit.content && <UnitContent content={courseUnit.content} />}
    </div>
  )
}
