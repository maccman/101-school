import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getModule } from '@/server/db/modules/getters'
import { getUnitsForModule } from '@/server/db/units/getters'

export default async function CourseModulePage({
  params,
}: {
  params: { moduleId: string }
}) {
  const [courseModule, courseUnits] = await Promise.all([
    getModule(params.moduleId),
    getUnitsForModule(params.moduleId),
  ])

  if (!courseModule) {
    return notFound()
  }

  return (
    <div>
      <p>{courseModule.title}</p>

      <ul>
        {courseUnits.map((courseUnit) => (
          <li key={courseUnit.id}>
            <Link
              href={`/courses/${courseModule.courseId}/modules/${courseModule.id}/units/${courseUnit.id}`}
              className="font-medium text-base mt-2"
            >
              {courseModule.number}.{courseUnit.number} {courseUnit.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
