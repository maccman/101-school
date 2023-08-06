import { z } from 'zod'

import { ApiBuilderHandler } from './types'
import { error } from '../error'

/**
 * withApiBuilder makes it fun to build APIs! It does query and post
 * parameter validation, method validation, and... actually that's it.
 *
 * const ApiSchema = z.object({
 *   unitId: z.string().uuid(),
 *   title: z.string().min(2).max(100),
 *   description: z.string().nonempty(),
 * })
 *
 * type ApiRequestParams = z.infer<typeof ApiSchema>
 *
 * const handleUnitUpdate = withAuth(
 *   withApiBuilder<ApiRequestParams, { userId: string }>(
 *     ApiSchema,
 *     async (request, { data, userId }) => {
 *       const courseUnit = await getUnitAndCourse(data.unitId)
 *
 *       return NextResponse.json({ success: true })
 *     },
 *   ),
 * )
 */

type ExtendedRequestArgs<T> = T & {
  params?: Record<string, unknown>
}

export function withApiBuilder<TRequestParams, TRequestArgs = {}>(
  schema: z.ZodType,
  next: ApiBuilderHandler<TRequestParams, TRequestArgs>,
) {
  return async (request: Request, pathArgs: ExtendedRequestArgs<TRequestArgs>) => {
    const uri = new URL(request.url)
    const bodyParams = await parseBodyParams(request)
    const searchParams = Object.fromEntries(uri.searchParams.entries())

    const rawParams = {
      ...searchParams,
      ...bodyParams,
      ...pathArgs.params,
    }

    const result = schema.safeParse(rawParams)

    if (!result.success) {
      const firstError = result.error?.errors?.[0]

      if (firstError) {
        return error(
          `${firstError.path} ${firstError.message}`.toLowerCase(),
          firstError.code,
          400,
        )
      } else {
        return error('invalid_request')
      }
    }

    const data = result.data as TRequestParams

    const args = {
      ...pathArgs,
      data,
    }

    return next(request, args)
  }
}

async function parseBodyParams(request: Request) {
  const contentType = request.headers.get('content-type')

  // Parse formData or json
  if (contentType?.includes('application/json')) {
    return request.json()
  }

  if (contentType?.includes('multipart/form-data')) {
    return parseFormData(request)
  }

  return {}
}

async function parseFormData(request: Request) {
  // Turn formData into an object
  const formData = await request.formData()
  const obj: Record<string, string | File> = {}

  for (const [key, value] of formData.entries()) {
    obj[key] = value
  }

  return obj
}
