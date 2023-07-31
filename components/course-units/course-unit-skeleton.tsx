'use client'

import { useEffect, useState } from 'react'

import { Progress } from '../ui/progress'

export function CourseUnitSkeleton() {
  const [value, setValue] = useState(10)

  useEffect(() => {
    setValue(90)
  }, [])

  return (
    <div className="flex-1 px-5 md:px-10 py-10 gap-5 flex flex-col items-center justify-center">
      <Progress value={value} className="max-w-sm h-2" />
    </div>
  )
}
