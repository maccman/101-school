import { getCourses } from '@/server/db/courses/getters'
import { updateCourse } from '@/server/db/courses/setters'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'

async function main() {
  const courses = await getCourses()

  for (const course of courses) {
    const headline =
      course.parsedContent.headline || course.parsedContent.outline || course.description

    if (!headline) {
      console.warn(`No headline for course ${course.id}`)
      continue
    }

    const result = await parseCourseCip(headline)

    if (!result.cipCode) {
      console.warn(`No CIP code for course ${course.id}`)
    }

    console.log(
      `Updating course ${course.id} with CIP code ${result.cipCode} / ${result.cipTitle}`,
    )

    await updateCourse(course.id, {
      cipCode: result.cipCode || null,
      cipTitle: result.cipTitle || null,
    })
  }
}

main()
