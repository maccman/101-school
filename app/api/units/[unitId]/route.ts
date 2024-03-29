import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getUnitAndCourse } from '@/server/db/units/getters'
import { updateUnit } from '@/server/db/units/setters'
import { withApiBuilder } from '@/server/helpers/api-builder'
import { withAuth } from '@/server/helpers/auth'
import { error } from '@/server/helpers/error'

const ApiSchema = z.object({
  unitId: z.string().uuid(),
  title: z.string().min(2).max(100),
  content: z.string().nonempty(),
})

type ApiRequestParams = z.infer<typeof ApiSchema>

export const PUT = withAuth(
  withApiBuilder<ApiRequestParams, { userId: string }>(
    ApiSchema,
    async (request, { data, userId }) => {
      const courseUnit = await getUnitAndCourse(data.unitId)

      if (!courseUnit) {
        return error('Unit not found', 'not_found', 404)
      }

      if (courseUnit.courseOwnerId !== userId) {
        return error('Unauthorized', 'unauthorized', 403)
      }

      await updateUnit(courseUnit.id, {
        title: data.title,
        content: data.content,
      })

      return NextResponse.json({ success: true })
    },
  ),
)
