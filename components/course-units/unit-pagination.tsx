'use server'

import Link from 'next/link'

import { getNextUnit, getUnitAndCourse } from '@/server/db/units/getters'
import { getPathForCourseUnit } from '@/server/helpers/links'

import { Button } from '../ui/button'

export async function UnitPagination({ unitId }: { unitId: string }) {
  const nextUnit = await getNextUnit(unitId)

  if (!nextUnit) {
    return null
  }

  const nextUnitAndCourse = await getUnitAndCourse(nextUnit.id)

  if (!nextUnitAndCourse) {
    return null
  }

  return (
    <Link
      href={getPathForCourseUnit({
        course: { slug: nextUnitAndCourse.courseSlug },
        courseModule: {
          number: nextUnitAndCourse.moduleNumber,
          title: nextUnitAndCourse.moduleTitle,
        },
        courseUnit: nextUnit,
      })}
    >
      <Button variant="ghost" asChild>
        <span>Next up: {nextUnit.title}</span>
      </Button>
    </Link>
  )
}
