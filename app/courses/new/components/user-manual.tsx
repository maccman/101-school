import { cn } from '@/lib/utils'

interface UserManualProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserManual({ className, ...props }: UserManualProps) {
  return (
    <div
      className={cn(
        'bg-muted dark:bg-transparent border py-4 px-6 rounded-md prose prose-sm prose-headings:text-xl dark:prose-invert',
        className,
      )}
      {...props}
    >
      <h2>User manual</h2>

      <p>
        We use the course description to generate a course outline. A description can be
        brief, such as <em>&apos;101 cooking school&apos;</em>, or more detailed, such as{' '}
        <em>&apos;Learn how to cook from scratch. Covering xyz areas&apos;</em>.
      </p>

      <p>
        We use GPT-4 to generate the actual course. The advantage of this, of course, is
        speed - it takes roughly five minutes to generate a comprenenshive 13 week course.
        The disadvantage is hallucinations. While in practice we have found hallucinations
        uncommon, they&apos;re always possible. Especially if you ask for a course on a
        topic that GPT-4 doesn&apos;t have enough data on.
      </p>

      <p>
        For example, good course topics are mainstream subjects, such as Astronomy or
        Music Theory. If you ask for a course on a specific book though, and GPT-4
        doesn&apos;t have the books contents (perhaps only the chapter titles), then
        it&apos;ll halluciate all the course contents. Caveat emptor.
      </p>
    </div>
  )
}
