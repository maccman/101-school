'use client'

import { useChat } from 'ai/react'
import React from 'react'

import { cn } from '@/lib/utils'

import { MessageItem } from './message-item'
import { Message } from './types'
import { Input } from '../ui/input'

interface ChatSidebarProps {
  initialMessages?: Message[]
  className?: string
}

export function ChatSidebarClient({ initialMessages, className }: ChatSidebarProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
  })

  const displayableMessages = messages.filter((message) => message.role !== 'system')

  return (
    <div className={cn('p-5 overflow-hidden flex flex-col space-y-4', className)}>
      <div className="flex-grow overflow-auto p-3 space-y-2 border rounded">
        {displayableMessages.map((message, i) => (
          <MessageItem key={i} message={message} />
        ))}
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
    </div>
  )
}
