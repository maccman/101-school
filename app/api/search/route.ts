import { NextResponse } from 'next/server'

import { SearchResult } from '@/app/types'
import { searchCourses } from '@/server/db/courses/getters'
import { Course } from '@/server/db/courses/types'
import { getUnitsByCourse, searchUnits } from '@/server/db/units/getters'
import { CourseModuleUnit } from '@/server/db/units/types'
import { getParams } from '@/server/helpers/params'

export const runtime = 'edge'

const headers = {
  'Cache-Control': 's-maxage=3600, stale-while-revalidate',
}

export async function GET(req: Request) {
  const params = getParams(req)
  const query = params.get('q')?.toLowerCase()
  const courseId = params.get('courseId')

  let results: SearchResult[] = []

  if (courseId && !query) {
    // Return all units for a course
    results = await getAllUnitsSearchResults(courseId)
  } else if (query) {
    // Return matching units and courses
    results = await getMatchingSearchResults(query, courseId)
  }

  return NextResponse.json(results, {
    headers,
  })
}

async function getAllUnitsSearchResults(courseId: string): Promise<SearchResult[]> {
  const allUnits = await getUnitsByCourse(courseId)
  return allUnits.map(unitToSearchResult)
}

async function getMatchingSearchResults(
  query: string,
  courseId: string | null,
): Promise<SearchResult[]> {
  const matchingUnits: CourseModuleUnit[] = courseId
    ? await searchUnits({ query, courseId })
    : []

  const matchingCourses = await searchCourses(query)

  return [
    ...matchingUnits.map(unitToSearchResult),
    ...matchingCourses.map(courseToSearchResult),
  ]
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
