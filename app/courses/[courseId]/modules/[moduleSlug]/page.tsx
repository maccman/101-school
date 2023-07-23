import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getModuleByNumber } from '@/server/db/modules/getters'
import { getUnitsByModule } from '@/server/db/units/getters'
import { generateHrefForCourseUnit } from '@/server/helpers/links'
import { getNumberFromSlug } from '@/server/helpers/slug'

export default async function CourseModulePage({
  params,
}: {
  params: { courseId: string; moduleSlug: string }
}) {
  const moduleNumber = getNumberFromSlug(params.moduleSlug)

  if (!moduleNumber) {
    return notFound()
  }

  const courseModule = await getModuleByNumber(params.courseId, moduleNumber)

  if (!courseModule) {
    return notFound()
  }

  const courseUnits = await getUnitsByModule(courseModule.id)

  return (
    <div>
      <p>{courseModule.title}</p>

      <ul>
        {courseUnits.map((courseUnit) => (
          <li key={courseUnit.id}>
            <Link
              href={generateHrefForCourseUnit({
                course: { id: params.courseId },
                courseModule,
                courseUnit,
              })}
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
