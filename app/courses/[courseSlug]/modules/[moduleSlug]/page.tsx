import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getUnitsByModule } from '@/server/db/units/getters'
import { getHrefForCourseUnit } from '@/server/helpers/links'
import { getCourseContext } from '@/server/helpers/params-getters'

export default async function CourseModulePage({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string }
}) {
  const { course, courseModule } = await getCourseContext(params)

  if (!course || !courseModule) {
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
              href={getHrefForCourseUnit({
                course,
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
