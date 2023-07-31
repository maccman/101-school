import { CourseEnrollment } from '@/server/db/enrollment/types'

import { Progress } from '../ui/progress'

interface CourseProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  courseEnrollment: CourseEnrollment
}

export function CourseProgress({ courseEnrollment, ...props }: CourseProgressProps) {
  if (courseEnrollment.completedUnitIds.length === 0) {
    return null
  }

  const totalCount = courseEnrollment.unitCount
  const completedCount = courseEnrollment.completedUnitIds.length

  const progress = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-2 px-5">
      <h4 className="text-2xs font-medium">Your progress</h4>
      <Progress value={progress} {...props} />
    </div>
  )
}
