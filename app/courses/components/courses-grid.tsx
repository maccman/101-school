import { CourseCard } from '@/components/courses/course-card'
import {
  getFeaturedCourses,
  getFeaturedCoursesByCategorySlug,
} from '@/server/db/courses/getters'

interface CoursesGrid {
  categorySlug?: string
}

export async function CoursesGrid({ categorySlug }: CoursesGrid) {
  const courses = categorySlug
    ? await getFeaturedCoursesByCategorySlug(categorySlug)
    : await getFeaturedCourses()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  )
}
