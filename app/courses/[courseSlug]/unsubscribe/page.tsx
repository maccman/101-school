import { notFound } from 'next/navigation'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getCourseBySlugOrId } from '@/server/db/courses/getters'

import { CourseUnsubscribeForm } from './components/course-unsubscribe-form'
import CourseSidebarLayout from '@/components/layouts/course-sidebar-layout'

export default async function CourseUnsubscribePage({
  params,
  searchParams,
}: {
  params: { courseSlug: string }
  searchParams?: { email?: string }
}) {
  const course = await getCourseBySlugOrId(params.courseSlug)

  if (!course) {
    return notFound()
  }

  return (
    <CourseSidebarLayout courseSlug={params.courseSlug}>
      <div className="flex-1 flex items-center justify-center">
        <Card className="text-center">
          <CardHeader className="space-y-5">
            <CardTitle>Unsubscribe from course</CardTitle>
            <CardDescription className="text-lg">
              <CourseUnsubscribeForm
                courseId={course.id}
                defaultEmail={searchParams?.email}
              />
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </CourseSidebarLayout>
  )
}
