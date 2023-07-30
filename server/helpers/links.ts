import { slugify } from '@/lib/slugify'

export function getPathForCourse(params: { course: { slug: string } }) {
  return `/courses/${params.course.slug}`
}

export function getPathForCourseModule(params: {
  course: { slug: string }
  courseModule: { number: number; title: string }
}) {
  return `/courses/${params.course.slug}/modules/${getSlug(params.courseModule)}`
}

export function getPathForCourseUnit(params: {
  course: { slug: string }
  courseModule: { number: number; title: string }
  courseUnit: { number: number; title: string }
}) {
  return `/courses/${params.course.slug}/modules/${getSlug(
    params.courseModule,
  )}/units/${getSlug(params.courseUnit)}`
}

export function getSlug({ number, title }: { number: number; title: string }) {
  return `${number}-${slugify(title)}`
}
