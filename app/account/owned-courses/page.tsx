import { getCoursesByOwner } from '@/server/db/courses/getters'
import { authOrRedirect } from '@/server/helpers/auth'

import { CourseItem } from './components/course-item'

export default async function AccountCreatedCourses() {
  const userId = await authOrRedirect()
  const courses = await getCoursesByOwner(userId)

  return (
    <div className="p-5 flex-1 overflow-auto">
      {courses.length === 0 && (
        <p className="text-gray-500">You haven&apos;t created any courses yet.</p>
      )}

      <div className="space-y-5">
        {courses.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </div>
    </div>
  )
}
