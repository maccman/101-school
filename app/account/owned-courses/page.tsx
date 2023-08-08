import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getCoursesByOwner } from '@/server/db/courses/getters'
import { authOrRedirect } from '@/server/helpers/auth'

import { CourseItem } from './components/course-item'

export default async function AccountCreatedCourses() {
  const userId = await authOrRedirect()
  const courses = await getCoursesByOwner(userId)

  return (
    <div className="p-5 flex-1 overflow-auto">
      {courses.length === 0 && (
        <div className="space-y-5 max-w-lg flex flex-col items-center justify-center">
          <p className="text-gray-500">You haven&apos;t created any courses yet.</p>

          <Link
            href="/courses/new"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Generate a new course...
          </Link>
        </div>
      )}

      <div className="space-y-5">
        {courses.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </div>
    </div>
  )
}
