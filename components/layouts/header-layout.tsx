import { Header } from '../header'

interface Props {
  children: React.ReactNode
  courseId?: string
}

export function HeaderLayout({ children, courseId }: Props) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header className="shrink-0" courseId={courseId} />

      <div className="flex-1 flex flex-col overflow-auto">{children}</div>
    </div>
  )
}
