import { CompleteButton } from './complete-button'
import { UnitPagination } from './unit-pagination'

interface UnitFooterProps {
  courseId: string
  unitId: string
}

export function UnitFooter({ courseId, unitId }: UnitFooterProps) {
  return (
    <footer className="rounded-lg border bg-card text-card-foreground shadow-sm my-10 p-5 flex gap-5 items-center">
      <CompleteButton courseId={courseId} unitId={unitId} />

      <div className="flex-1" />

      <UnitPagination unitId={unitId} />
    </footer>
  )
}
