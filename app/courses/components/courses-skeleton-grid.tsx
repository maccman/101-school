import { Skeleton } from '@/components/ui/skeleton'

export async function CoursesSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[30px] w-2/3" />
        </div>
      ))}
    </div>
  )
}
