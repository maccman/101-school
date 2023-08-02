import { assert } from '@/lib/assert'
import { getCourseSubscription } from '@/server/db/course_subscriptions/getters'
import { getCourse, getCourseUnits } from '@/server/db/courses/getters'

import { stepSendEmail } from './step-send-email'
import { inngest } from '../../client'

export const courseSubscribe = inngest.createFunction(
  {
    name: 'Course Subscribe',
    cancelOn: [{ event: 'course/unsubscribe', match: 'data.courseSubscriptionId' }],
  },
  { event: 'course/subscribe' },
  async ({ event, step, logger }) => {
    const { courseSubscriptionId } = event.data

    logger.info('Subscribe to course', { courseSubscriptionId })

    const courseSubscription = await step.run('Get course subscription', () =>
      getCourseSubscription(courseSubscriptionId),
    )

    assert(courseSubscription, 'Course subscription not found')

    const course = await step.run('Get course', () =>
      getCourse(courseSubscription.courseId),
    )

    assert(course, 'Course not found')

    logger.info(`Processing subscription for: ${course.title}`)

    const courseUnits = await step.run('Get course units', async () =>
      getCourseUnits(course.id),
    )

    if (courseUnits.length === 0) {
      logger.warn('Course has no units')
      return
    }

    logger.info(`Found ${courseUnits.length} units`)

    for (const unit of courseUnits) {
      await step.run(`Send email for unit ${unit.id}`, async () => {
        await stepSendEmail({
          unitId: unit.id,
          courseSubscriptionId,
          logger,
        })
      })

      await step.sleep(`${courseSubscription.daysInterval} days`)
    }
  },
)
