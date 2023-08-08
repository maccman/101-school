'use client'

import { useChat } from 'ai/react'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

import { ChatMessage } from './chat-message'
import { Message } from './types'
import { ChatScrollAnchor } from '../chat-scroll-anchor'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { Input } from '../ui/input'

interface ChatSidebarProps {
  initialMessages?: Message[]
  className?: string
  promptAuth?: boolean
}

export function ChatSidebarClient({
  initialMessages,
  className,
  promptAuth = false,
}: ChatSidebarProps) {
  const { append, messages, input, handleInputChange, handleSubmit, isLoading } = useChat(
    {
      initialMessages,
    },
  )

  const displayableMessages = messages.filter((message) => message.role !== 'system')

  function addUserMessage(content: string) {
    append({
      role: 'user',
      content,
    })
  }

  return (
    <div
      className={cn('p-5 overflow-hidden flex flex-col space-y-4 relative', className)}
    >
      <div className="flex-none flex gap-2">
        <Badge
          className="bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-900 cursor-pointer"
          onClick={() =>
            addUserMessage('Test me on this unit. Ask me one question at a time.')
          }
        >
          Test me
        </Badge>

        <Badge
          className="bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-900 cursor-pointer"
          onClick={() =>
            addUserMessage('Give me a practical exercise based on this unit.')
          }
        >
          Practical exercise
        </Badge>

        <Badge
          className="bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-900 cursor-pointer"
          onClick={() =>
            addUserMessage('Do you have any further reading based on this unit?')
          }
        >
          Further reading
        </Badge>
      </div>

      <div className="flex-grow overflow-auto px-5 py-5 space-y-3 border rounded">
        {displayableMessages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        <ChatScrollAnchor trackVisibility={isLoading} />
      </div>

      <div className="flex-none">
        <form onSubmit={handleSubmit}>
          <Input
            className="w-full"
            type="text"
            placeholder="Type your message..."
            onChange={handleInputChange}
            value={input}
          />
        </form>
      </div>

      {promptAuth ? (
        <div className="absolute inset-0 p-3 flex flex-col items-center justify-center bg-white/60">
          <Link
            href="/auth?redirect=back"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Sign in to chat
          </Link>
        </div>
      ) : null}
    </div>
  )
}
