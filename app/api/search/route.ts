import { NextResponse } from 'next/server'

import { SearchResult } from '@/app/types'
import { searchCourses } from '@/server/db/courses/getters'
import { Course } from '@/server/db/courses/types'
import { searchUnits } from '@/server/db/units/getters'
import { CourseModuleUnit } from '@/server/db/units/types'
import { getParams } from '@/server/helpers/params'

export const runtime = 'edge'

export async function GET(req: Request) {
  const params = getParams(req)
  const query = params.get('q')?.toLowerCase()

  if (!query) {
    return NextResponse.json([])
  }

  const courseId = params.get('courseId')

  const matchingUnits: CourseModuleUnit[] = courseId
    ? await searchUnits({ query, courseId })
    : []

  const matchingCourses = await searchCourses(query)

  const results: SearchResult[] = [
    ...matchingUnits.map(unitToSearchResult),
    ...matchingCourses.map(courseToSearchResult),
  ]

  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}

function unitToSearchResult(unit: CourseModuleUnit): SearchResult {
  return {
    type: 'unit',
    id: unit.id,
    title: unit.title,
    path: `/api/redirect/units/${unit.id}`,
  }
}

function courseToSearchResult(course: Course): SearchResult {
  return {
    type: 'course',
    id: course.id,
    title: course.title,
    path: `/api/redirect/courses/${course.id}`,
  }
}
