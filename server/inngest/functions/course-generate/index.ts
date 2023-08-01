import { assert } from '@/lib/assert'
import { getCourse } from '@/server/db/courses/getters'
import { updateCourse } from '@/server/db/courses/setters'

import { stepGenerateModule } from './step-generate-module'
import { stepGenerateUnit } from './step-generate-unit'
import { stepParseCourse } from './step-parse-course'
import { inngest } from '../../client'

export const courseGenerate = inngest.createFunction(
  { name: 'Generate a course' },
  { event: 'course/generate' },
  async ({ event, step, logger }) => {
    const { courseId } = event.data

    logger.info('1. Parse course', { courseId })

    // 1. Parse course
    await step.run('Parse course', () => stepParseCourse({ courseId, logger }))

    logger.info('debug', { courseId })

    const course = await step.run('Get course', () => getCourse(courseId))
    assert(course, 'Course not found')
    assert(course.parsedContent, 'Course content not found')
    assert(course.parsedContent.modules.length > 0, 'Course has no modules')

    logger.info('2. Generate modules', { courseId })

    // 2. Generate modules
    await Promise.all(
      course.parsedContent.modules.map((parsedModule) =>
        step.run('Generate modules', () =>
          stepGenerateModule({ parsedModule, courseId, logger }),
        ),
      ),
    )

    logger.info('3. Generate units', { courseId })

    // 3. Generate units
    await Promise.all(
      course.parsedContent.modules
        .map((parsedModule) =>
          parsedModule.units.map((parsedUnit) =>
            step.run('Generate unit', () =>
              stepGenerateUnit({ parsedUnit, courseId, parsedModule, logger }),
            ),
          ),
        )
        .flat(),
    )

    // 4. Done
    await step.run('Done', () => updateCourse(course.id, { generatedAt: new Date() }))
  },
)
