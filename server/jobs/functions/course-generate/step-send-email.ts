import { renderAsync } from '@react-email/render'

import { assert } from '@/plugins/assert'
import { createEmail } from '@/plugins/resend'
import { getCourse } from '@/server/db/courses/getters'
import { getUser } from '@/server/db/users/getters'
import { CourseCreatedEmail } from '@/server/emails/course-created-email'

export async function stepSendEmail({
  courseId,
  userId,
}: {
  courseId: string
  userId: string
}) {
  const course = await getCourse(courseId)
  const user = await getUser(userId)
  const toEmail = user?.emails[0]

  assert(course, `Course ${courseId} not found`)

  if (!toEmail) {
    console.warn(`User ${userId} has no email`)
    return
  }

  const element = CourseCreatedEmail({
    userName: user?.name ?? null,
    courseSlug: course.slug,
    courseTitle: course.title,
    courseDescription: course.description,
  })

  const html = await renderAsync(element)

  const text = await renderAsync(element, {
    plainText: true,
  })

  await createEmail({
    html,
    text,
    subject: `Your course on ${course.title} is ready!`,
    to: toEmail,
    from: 'alex@101.school',
  })
}
