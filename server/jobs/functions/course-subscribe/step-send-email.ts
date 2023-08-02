import { Logger } from 'inngest/middleware/logger'

import { assert } from '@/lib/assert'
import { createEmail } from '@/lib/resend'
import { getCourseSubscription } from '@/server/db/course_subscriptions/getters'
import { getUnitAndCourse } from '@/server/db/units/getters'
import { CourseUnitEmail } from '@/server/emails/course-unit-email'
import {
  renderHtmlAsync,
  renderTextAsync,
} from '@/server/helpers/react-email/react-email'

export async function stepSendEmail({
  unitId,
  courseSubscriptionId,
  logger,
}: {
  unitId: string
  courseSubscriptionId: string
  logger: Logger
}) {
  const courseSubscription = await getCourseSubscription(courseSubscriptionId)
  assert(courseSubscription, 'Course subscription not found')

  const courseUnit = await getUnitAndCourse(unitId)
  assert(courseUnit, 'Course unit not found')

  logger.info(`Generating email for subscription ${courseSubscriptionId}`)
  const element = CourseUnitEmail({
    course: {
      id: courseUnit.courseId,
      title: courseUnit.courseTitle,
    },
    courseModule: {
      number: courseUnit.moduleNumber,
    },
    courseUnit,
    email: courseSubscription.email,
  })

  const html = await renderHtmlAsync(element)

  const text = await renderTextAsync(element)

  logger.info(`Sending email for subscription ${courseSubscriptionId}`)
  await createEmail({
    html,
    text,
    subject: courseUnit.title,
    to: courseSubscription.email,
    from: 'noreply@101.school',
  })

  logger.info(`Email sent for subscription ${courseSubscriptionId}`)
}
