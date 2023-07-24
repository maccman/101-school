import Link from 'next/link'

import { getCoursesWithImages } from '@/server/db/courses/getters'

export default async function CoursesPage() {
  const courses = await getCoursesWithImages()

  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold mb-3">Courses</h1>

      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  )
}

function CourseCard({
  course,
}: {
  course: {
    slug: string
    title: string
    description: string
    image: { source: string } | null
  }
}) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="space-y-1">
        <h3 className="text-lg">{course.title}</h3>
        {course.description && <h4 className="text-sm">{course.description}</h4>}
        {course.image?.source && (
          <div className="rounded-md overflow-hidden max-w-[500px]">
            <img
              src={course.image.source}
              alt={course.title}
              className="h-auto w-auto object-cover aspect-video transition-all hover:scale-105"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
