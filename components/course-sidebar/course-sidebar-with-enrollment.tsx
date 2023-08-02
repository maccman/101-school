import { CourseSidebar } from '@/components/course-sidebar'
import { Course, CourseUnits } from '@/server/db/courses/types'
import { getCourseEnrollment } from '@/server/db/enrollment/getters'
import { getUser } from '@/server/db/users/getters'
import { auth } from '@/server/helpers/auth'

interface CourseSidebarWithEnrollmentProps extends React.HTMLAttributes<HTMLDivElement> {
  course: Course
  courseUnits: CourseUnits
}

export default async function CourseSidebarWithEnrollment({
  course,
  courseUnits,
  ...props
}: CourseSidebarWithEnrollmentProps) {
  const userId = await auth()

  const [user, courseEnrollment] = await Promise.all([
    userId ? getUser(userId) : null,
    userId ? getCourseEnrollment({ userId, courseId: course.id }) : null,
  ])

  return (
    <CourseSidebar
      course={course}
      courseUnits={courseUnits}
      courseEnrollment={courseEnrollment}
      userEmail={user?.emails?.[0]}
      {...props}
    />
  )
}
