import { getCoursesByUser } from '@/server/db/courses/getters'
import { authOrRedirect } from '@/server/helpers/auth'

import { CourseItem } from './components/course-item'

export default async function AccountCourses() {
  const userId = await authOrRedirect()
  const courses = await getCoursesByUser(userId)

  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold mb-3">Courses</h1>

      {courses.length === 0 && (
        <p className="text-gray-500">You haven&apos;t enrolled in any courses yet.</p>
      )}

      <div className="space-y-5">
        {courses.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </div>
    </div>
  )
}
