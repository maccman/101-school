import { redirect } from 'next/navigation'

import { CourseGenerating } from '@/components/courses/course-generating'
import { getCourse } from '@/server/db/courses/getters'

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams?: { courseId: string }
}) {
  const course = searchParams?.courseId ? await getCourse(searchParams.courseId) : null

  if (course?.generatedAt) {
    redirect(`/courses/${course.slug}`)
  }

  return <CourseGenerating />
}
