import { NextResponse } from 'next/server'

import { slugify } from '@/plugins/slugify'
import { generateUniqueCourseSlug } from '@/server/db/courses/getters'
import { createCourse } from '@/server/db/courses/setters'
import { withAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'
import { inngest } from '@/server/jobs/client'

async function handleCreateCourse(request: Request, { userId }: { userId: string }) {
  const { title, description, content } = await request.json()

  if (!title || !description || !content) {
    return error('Please fill in all fields')
  }

  const slug = await generateUniqueCourseSlug(slugify(title))

  const courseId = await createCourse({
    ownerId: userId,
    title,
    description,
    content,
    slug,
  })

  await inngest.send({
    id: `course-generate-${courseId}`,
    name: 'course/generate',
    data: {
      courseId,
    },
  })

  return NextResponse.json({ id: courseId })
}

export const POST = withAuth(handleCreateCourse)
