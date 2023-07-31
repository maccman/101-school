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

  const nextUnitAndCourse = await getUnitAndCourse(nextUnit.nextId)

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
        courseUnit: { number: nextUnitAndCourse.number, title: nextUnitAndCourse.title },
      })}
    >
      <Button variant="ghost" asChild>
        <span>Skip to: {nextUnit.nextTitle}</span>
      </Button>
    </Link>
  )
}
