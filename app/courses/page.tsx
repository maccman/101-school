import Link from 'next/link'

import { getCourses } from '@/server/db/courses/getters'

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div>
      <h1>Courses</h1>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
