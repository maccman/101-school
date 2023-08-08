import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getCoursesByEnrolledUser } from '@/server/db/courses/getters'
import { authOrRedirect } from '@/server/helpers/auth'

import { CourseItem } from './components/course-item'

export default async function AccountCourses() {
  const userId = await authOrRedirect()
  const courses = await getCoursesByEnrolledUser(userId)

  return (
    <div className="p-5 flex-1 overflow-auto">
      {courses.length === 0 && (
        <div className="space-y-5 max-w-lg flex flex-col items-center justify-center">
          <p className="text-gray-500">You haven&apos;t enrolled in any courses yet.</p>

          <Link href="/courses" className={cn(buttonVariants({ variant: 'outline' }))}>
            See all courses...
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
