import { CourseCard } from '@/components/courses/course-card'
import { getCoursesByUser } from '@/server/db/courses/getters'
import { authOrRedirect } from '@/server/helpers/auth'

export default async function AccountCourses() {
  const userId = await authOrRedirect()
  const courses = await getCoursesByUser(userId)

  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold mb-3">Courses</h1>

      {courses.length === 0 && (
        <p className="text-gray-500">You haven&apos;t enrolled in any courses yet.</p>
      )}

      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  )
}
