import { GraduationCap, User } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Message } from './types'

export function MessageItem({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant'

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        isAssistant ? 'flex-row' : 'flex-row-reverse',
      )}
    >
      <div className="flex-none flex flex-col items-center space-y-1 p-2">
        {isAssistant ? (
          <GraduationCap className="w-6 h-6 text-indigo-900" />
        ) : (
          <User className="w-6 h-6 text-indigo-900" />
        )}
      </div>

      <div className="flex-1 bg-indigo-100 text-gray-800 p-2 px-3 rounded-lg relative">
        <div className="text-sm">{message.content}</div>

        {isAssistant ? <LeftArrow /> : <RightArrow />}
      </div>
    </div>
  )
}

function RightArrow() {
  return (
    <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 -mt-1 h-2 bg-indigo-100"></div>
  )
}

function LeftArrow() {
  return (
    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 -mt-1 h-2 bg-indigo-100"></div>
  )
}
