import slugify from '@sindresorhus/slugify'

export function getHrefForCourseModule(params: {
  course: { slug: string }
  courseModule: { number: number; title: string }
}) {
  return `/courses/${params.course.slug}/modules/${params.courseModule.number}-${slugify(
    params.courseModule.title,
  )}`
}

export function getHrefForCourseUnit(params: {
  course: { slug: string }
  courseModule: { number: number; title: string }
  courseUnit: { number: number; title: string }
}) {
  return `/courses/${params.course.slug}/modules/${params.courseModule.number}-${slugify(
    params.courseModule.title,
  )}/units/${params.courseUnit.number}-${slugify(params.courseUnit.title)}`
}
