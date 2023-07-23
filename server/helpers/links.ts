import slugify from '@sindresorhus/slugify'

export function generateHrefForCourseModule(params: {
  course: { id: string }
  courseModule: { number: number; title: string }
}) {
  return `/courses/${params.course.id}/modules/${params.courseModule.number}-${slugify(
    params.courseModule.title,
  )}`
}

export function generateHrefForCourseUnit(params: {
  course: { id: string }
  courseModule: { number: number; title: string }
  courseUnit: { number: number; title: string }
}) {
  return `/courses/${params.course.id}/modules/${params.courseModule.number}-${slugify(
    params.courseModule.title,
  )}/units/${params.courseUnit.number}-${slugify(params.courseUnit.title)}`
}
