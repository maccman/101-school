import { notFound } from 'next/navigation'

import { UnitContent } from '@/components/course-units/unit-content'
import { UnitImage } from '@/components/course-units/unit-image'
import { getUnit } from '@/server/db/units/getters'

export default async function CoursePage({ params }: { params: { unitId: string } }) {
  const courseUnit = await getUnit(params.unitId)

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
