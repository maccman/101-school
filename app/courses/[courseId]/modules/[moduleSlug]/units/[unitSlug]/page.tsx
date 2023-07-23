import { notFound } from 'next/navigation'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { getModuleByNumber } from '@/server/db/modules/getters'
import { getUnitByNumber } from '@/server/db/units/getters'
import { getNumberFromSlug } from '@/server/helpers/slug'

export default async function CoursePage({
  params,
}: {
  params: { courseId: string; moduleSlug: string; unitSlug: string }
}) {
  const moduleNumber = getNumberFromSlug(params.moduleSlug)
  const unitNumber = getNumberFromSlug(params.unitSlug)

  if (!moduleNumber || !unitNumber) {
    return notFound()
  }

  const courseModule = await getModuleByNumber(params.courseId, moduleNumber)

  if (!courseModule) {
    return notFound()
  }

  const courseUnit = await getUnitByNumber(courseModule.id, unitNumber)

  if (!courseUnit) {
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
