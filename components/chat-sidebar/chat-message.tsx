import { GraduationCap, User } from 'lucide-react'

import { cn } from '@/plugins/utils'

import { ChatMessageContent } from './chat-message-content'
import { Message } from './types'

export function ChatMessage({ message }: { message: Message }) {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={cn('flex gap-4', isAssistant ? 'flex-row' : 'flex-row-reverse')}>
      <div className="flex-none flex flex-col items-center pt-2">
        {isAssistant ? (
          <GraduationCap className="w-6 h-6 text-indigo-900" />
        ) : (
          <User className="w-6 h-6 text-indigo-900" />
        )}
      </div>

      <div className="flex-1 bg-indigo-100 dark:bg-indigo-950 text-gray-800 p-2 px-3 rounded-lg relative">
        <ChatMessageContent content={message.content} />

        {isAssistant ? <LeftArrow /> : <RightArrow />}
      </div>
    </div>
  )
}

function RightArrow() {
  return (
    <div className="absolute right-0 top-5 transform translate-x-1/2 rotate-45 w-2 -mt-1 h-2 bg-indigo-100 dark:bg-indigo-950"></div>
  )
}

function LeftArrow() {
  return (
    <div className="absolute left-0 top-5 transform -translate-x-1/2 rotate-45 w-2 -mt-1 h-2 bg-indigo-100 dark:bg-indigo-950"></div>
  )
}
