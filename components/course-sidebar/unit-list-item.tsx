import { CheckCircle, CircleDashed } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Course, CourseModule } from '@/server/db/courses/types'
import { getPathForCourseUnit } from '@/server/helpers/links'

import { Tooltip } from '../tooltip'
import { buttonVariants } from '../ui/button'

interface UnitListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  course: Course
  courseModule: CourseModule
  courseUnit: {
    id: string
    title: string
    number: number
  }
  completed: boolean
}

export function UnitListItem({
  course,
  courseModule,
  courseUnit,
  completed,
  ...props
}: UnitListItemProps) {
  const pathname = usePathname()

  const unitPath = getPathForCourseUnit({
    course,
    courseModule,
    courseUnit,
  })

  return (
    <li {...props}>
      <Link
        href={unitPath}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          pathname === unitPath ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent',
          'justify-start w-full flex space-x-3',
        )}
      >
        <span className="bg-gray-50 min-w-[5px] px-2 py-1 rounded-md">
          {courseModule.number}.{courseUnit.number}
        </span>
        <span className="flex-1">{courseUnit.title}</span>

        <div className="flex-none flex items-center">
          {completed ? (
            <Tooltip title="Completed unit">
              <CheckCircle className="text-green-500 w-4 h-4" />
            </Tooltip>
          ) : (
            <Tooltip title="Uncompleted">
              <CircleDashed className="w-4 h-4 text-gray-300" />
            </Tooltip>
          )}
        </div>
      </Link>
    </li>
  )
}
