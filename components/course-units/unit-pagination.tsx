'use server'

import Link from 'next/link'
import { Suspense } from 'react'

import { getNextUnit, getUnitAndCourse } from '@/server/db/units/getters'
import { getPathForCourseUnit } from '@/server/helpers/links'

import { CompleteButton } from './complete-button'
import { Button } from '../ui/button'

export async function UnitPagination({ unitId }: { unitId: string }) {
  const nextUnit = await getNextUnit(unitId)

  if (!nextUnit) {
    return null
  }

  const courseUnit = await getUnitAndCourse(nextUnit.nextId)

  if (!courseUnit) {
    return null
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm my-10 p-5 flex gap-5 items-center">
      <Suspense>
        <CompleteButton
          courseId={courseUnit.courseId}
          unitId={courseUnit.id}
          nextUnitId={nextUnit.id}
        />
      </Suspense>

      <div className="flex-1" />

      <Link
        href={getPathForCourseUnit({
          course: { slug: courseUnit.courseSlug },
          courseModule: {
            number: courseUnit.moduleNumber,
            title: courseUnit.moduleTitle,
          },
          courseUnit: { number: courseUnit.number, title: courseUnit.title },
        })}
      >
        <Button variant="ghost" asChild>
          <span>Skip to: {nextUnit.nextTitle}</span>
        </Button>
      </Link>
    </div>
  )
}
