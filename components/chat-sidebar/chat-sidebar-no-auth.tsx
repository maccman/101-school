import Link from 'next/link'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'

interface ChatSidebarNoAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChatSidebarNoAuth({ className, ...props }: ChatSidebarNoAuthProps) {
  return (
    <div
      className={cn('p-5 overflow-hidden flex flex-col space-y-4', className)}
      {...props}
    >
      <div className="flex-grow overflow-auto p-3 border rounded flex flex-col items-center justify-center">
        <Link href="/auth" className={cn(buttonVariants({ variant: 'outline' }))}>
          Sign in to chat
        </Link>
      </div>

      <div className="flex-none">
        <div className="w-full rounded border p-2 text-sm text-slate-900/50">
          Type your message...
        </div>
      </div>
    </div>
  )
}
