import { cn } from '@/plugins/utils'

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
        The disadvantage is hallucinations.
      </p>

      <p>
        While in practice we have found hallucinations to be rare, they&apos;re always
        possible. Especially if you ask for a course on a topic that GPT-4 doesn&apos;t
        have enough data on. The worst is when you ask for a course about a book that
        GPT-4 knows the chapter titles of, but not the contents. Total gibberish.
      </p>

      <p>
        Outside of those caveats we do most text-book material well. Practical courses are
        more of hit and miss. You&apos;ll just have to try it out and see.
      </p>

      <p>p.s. generated courses, for now, will be public so please keep them SFW.</p>
    </div>
  )
}
