'use server'

import { getNextUnit } from '@/server/db/units/getters'

export async function UnitPagination({ unitId }: { unitId: string }) {
  const nextUnit = await getNextUnit(unitId)

  if (!nextUnit) {
    return null
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm my-10 p-5">
      <h2>Next Unit</h2>
      <p>{nextUnit.nextTitle}</p>
    </div>
  )
}
