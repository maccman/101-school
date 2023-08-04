import { renderAsync } from '@react-email/render'

import { CourseCreatedEmail } from '@/server/emails/course-created-email'

export const config = {
  runtime: 'edge',
}

export default async function handle() {
  const element = CourseCreatedEmail({
    userName: 'John Doe',
    courseSlug: 'course-slug',
    courseTitle: 'Course Title',
    courseDescription: 'Course Description',
  })

  const html = await renderAsync(element)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
