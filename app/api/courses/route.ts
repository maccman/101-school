import { NextResponse } from 'next/server'

import { slugify } from '@/lib/slugify'
import { generateUniqueCourseSlug } from '@/server/db/courses/getters'
import { createCourse } from '@/server/db/courses/setters'
import { withAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'

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

  return NextResponse.redirect(`/api/course/${courseId}/checkout`, { status: 303 })
}

export const POST = withAuth(handleCreateCourse)
