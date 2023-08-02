import React from 'react'

import { assert } from '@/lib/assert'
import { createEmail } from '@/lib/resend'
import { getCourseSubscription } from '@/server/db/course_subscriptions/getters'
import { getUnitAndCourse } from '@/server/db/units/getters'
import { CourseUnitEmail } from '@/server/emails/course-unit-email'
import { renderAsync } from '@/server/helpers/react-email'

export async function stepSendEmail({
  unitId,
  courseSubscriptionId,
}: {
  unitId: string
  courseSubscriptionId: string
}) {
  const courseSubscription = await getCourseSubscription(courseSubscriptionId)
  assert(courseSubscription, 'Course subscription not found')

  const courseUnit = await getUnitAndCourse(unitId)
  assert(courseUnit, 'Course unit not found')

  const element = React.createElement(CourseUnitEmail, {
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

  const html = await renderAsync(element)

  const text = await renderAsync(element, {
    plainText: true,
  })

  await createEmail({
    html,
    text,
    subject: courseUnit.title,
    to: courseSubscription.email,
    from: 'noreply@101.school',
  })
}
