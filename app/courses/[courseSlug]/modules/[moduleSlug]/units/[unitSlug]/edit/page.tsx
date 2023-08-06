import { notFound } from 'next/navigation'

import { authOrRedirect } from '@/server/helpers/auth'
import { getCourseContext } from '@/server/helpers/params-getters'

import { EditUnitForm } from './components/edit-unit-form'

export default async function AdminCourseUnitEdit({
  params,
}: {
  params: { courseSlug: string; moduleSlug: string; unitSlug: string }
}) {
  const { course, courseUnit } = await getCourseContext(params)
  const userId = await authOrRedirect()

  if (!courseUnit) {
    return notFound()
  }

  if (course.ownerId !== userId) {
    console.warn(`User ${userId} is not the owner of course ${course.id}.`)
    return notFound()
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Edit unit</h2>

      <EditUnitForm
        unitId={courseUnit.id}
        unitTitle={courseUnit.title}
        unitContent={courseUnit.content}
      />
    </div>
  )
}
