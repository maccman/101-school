import { NextResponse } from 'next/server'
import { z } from 'zod'

import { slugify } from '@/lib/slugify'
import { generateUniqueCourseSlug } from '@/server/db/courses/getters'
import { createCourse } from '@/server/db/courses/setters'
import { withApiBuilder } from '@/server/helpers/api-builder'
import { withAuth } from '@/server/helpers/auth'
import { inngest } from '@/server/jobs/client'

const ApiSchema = z.object({
  title: z.string().min(2).max(100),
  language: z.string().optional().default('English'),
  weekCount: z.coerce.number().default(4),
  description: z.string().min(10).max(5000),
  content: z.string().min(10).max(5000),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

export const POST = withAuth(
  withApiBuilder<ApiRequestParams, { userId: string }>(
    ApiSchema,
    async (request, { data, userId }) => {
      const { title, description, content, language, weekCount } = data

      const slug = await generateUniqueCourseSlug(slugify(title))

      const courseId = await createCourse({
        ownerId: userId,
        title,
        language,
        weekCount,
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
    },
  ),
)
