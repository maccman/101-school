import Link from 'next/link'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  course: {
    slug: string
    title: string
    headline: string
    image: { source: string } | null
  }
}

export function CourseCard({ course, ...props }: Props) {
  return (
    <Link href={`/courses/${course.slug}`} {...props}>
      <div className="space-y-2">
        {course.image?.source && (
          <div className="rounded-md overflow-hidden max-w-[500px]">
            <img
              src={course.image.source}
              alt={course.title}
              className="h-full w-full min-h-[20px] object-cover aspect-video transition-all hover:scale-105 bg-muted"
            />
          </div>
        )}

        <div>
          <h3 className="truncate font-medium tracking-tight">{course.title}</h3>
          {course.headline && (
            <h4
              className="text-sm text-muted-foreground truncate"
              title={course.headline}
            >
              {course.headline}
            </h4>
          )}
        </div>
      </div>
    </Link>
  )
}
