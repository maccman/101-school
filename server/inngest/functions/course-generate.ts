import { Selectable } from 'kysely'

import { assert, assertString } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { updateCourse } from '@/server/db/courses/setters'
import { getModuleByNumber } from '@/server/db/modules/getters'
import { setModule } from '@/server/db/modules/setters'
import { Course, CourseParsedModule, CourseParsedUnit } from '@/server/db/schema'
import { setUnit } from '@/server/db/units/setters'
import { generateCourse } from '@/server/helpers/ai/prompts/generate-course'
import { generateModule } from '@/server/helpers/ai/prompts/generate-module'
import { generateUnit } from '@/server/helpers/ai/prompts/generate-unit'
import { generateWikipediaUrls } from '@/server/helpers/ai/prompts/generate-wikipedia-links'
import { parseCourse } from '@/server/helpers/ai/prompts/parse-course'
import { parseCourseCip } from '@/server/helpers/ai/prompts/parse-course-cip'
import { pickImageForWikpediaUrls } from '@/server/lib/wikipedia'

import { inngest } from '../client'

export const courseGenerate = inngest.createFunction(
  { name: 'Generate a course' },
  { event: 'course/generate' },
  async ({ event, step }) => {
    const { courseId } = event.data

    // 1. Parse course
    await step.run('Parse course', async () => {
      await stepParseCourse(courseId)
    })

    const course = await getCourse(courseId)
    assert(course, 'Course not found')
    assert(course.parsedContent, 'Course content not found')

    // 2. Generate modules
    await Promise.all(
      course.parsedContent.modules.map((mod) =>
        step.run('Generate modules', () => stepGenerateModule(mod, course)),
      ),
    )

    // 3. Generate units
    await Promise.all(
      course.parsedContent.modules
        .map((parsedModule) =>
          parsedModule.units.map((parsedUnit) =>
            step.run('Generate unit', () =>
              stepGenerateUnit({ parsedUnit, course, parsedModule }),
            ),
          ),
        )
        .flat(),
    )

    // 4. Done
    await step.run('Done', () => {
      updateCourse(course.id, { generatedAt: new Date() })
    })
  },
)

async function stepParseCourse(courseId: string) {
  const course = await getCourse(courseId)
  assert(course, 'Course not found')

  // Generate course if not already generated
  const content = course.content || (await generateCourse(course.description))
  assertString(content, 'Course content not found')

  // Extract structured data from course
  const parsedContent = await parseCourse(content)

  // Extract CIP code and title from course
  const { cipCode, cipTitle } = await safeParseCourseCip(content)

  await updateCourse(course.id, {
    content,
    parsedContent,
    cipCode,
    cipTitle,
  })
}

async function stepGenerateModule(
  parsedModule: CourseParsedModule,
  course: Selectable<Course>,
) {
  const moduleContent = await generateModule({
    courseDescription: course.description,
    courseBody: course.content,
    moduleNumber: parsedModule.week,
  })

  await setModule({
    courseId: course.id,
    title: parsedModule.title,
    content: moduleContent,
    number: parsedModule.week,
  })
}

async function stepGenerateUnit({
  parsedUnit,
  course,
  parsedModule,
}: {
  parsedUnit: CourseParsedUnit
  parsedModule: CourseParsedModule
  course: Selectable<Course>
}) {
  const courseModule = await getModuleByNumber(course.id, parsedModule.week)
  assert(courseModule, 'Module not found')

  const unitContent = await generateUnit({
    courseDescription: course.description,
    courseBody: course.content,
    moduleBody: courseModule.content,
    moduleNumber: parsedModule.week,
    unitNumber: parsedUnit.number,
  })

  const wikipediaUrls = await safeGenerateWikipediaUrls(unitContent)

  const image = await pickImageForWikpediaUrls(wikipediaUrls)

  await setUnit({
    moduleId: module.id,
    number: parsedUnit.number,
    title: parsedUnit.title,
    content: unitContent,
    wikipediaUrls,
    image,
  })
}

function safeGenerateWikipediaUrls(content: string) {
  try {
    return generateWikipediaUrls(content)
  } catch (error) {
    console.error(error)
    return []
  }
}

function safeParseCourseCip(content: string) {
  try {
    return parseCourseCip(content)
  } catch (error) {
    console.error(error)
    return {
      cipCode: null,
      cipTitle: null,
    }
  }
}
