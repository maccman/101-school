import { prompt } from '@/lib/readline'
import { getCourseUnitsMap } from '@/server/db/courses/getters'

async function main() {
  console.log('Getting course units map...')

  const courseId = await prompt('Course ID: ')

  const result = await getCourseUnitsMap(courseId)

  console.log(result)
}

main()
