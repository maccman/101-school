import { Message } from 'ai'
import sample from 'lodash/sample'
import { notFound } from 'next/navigation'

import { getUnitMessages } from '@/server/db/messages/getters'
import { getUnit } from '@/server/db/units/getters'

import { ChatSidebarClient } from './chat-sidebar-client'
import { unitMessageToChatMessage } from './utils'

interface ChatSidebarProps {
  userId: string
  unitId: string
  className?: string
}
export async function ChatSidebar({ userId, unitId, className }: ChatSidebarProps) {
  const unit = await getUnit(unitId)

  if (!unit) {
    notFound()
  }

  const initialMessages = await getInitialMessages({
    userId,
    unitId,
    unitContent: unit.content,
  })

  return <ChatSidebarClient initialMessages={initialMessages} className={className} />
}

async function getInitialMessages({
  userId,
  unitId,
  unitContent,
}: {
  userId: string
  unitId: string
  unitContent: string
}): Promise<Message[]> {
  const unitMessages = await getUnitMessages({ userId, unitId })

  return [
    ...getSystemMessages(unitContent),
    ...unitMessages.map(unitMessageToChatMessage),
  ]
}

const assistantOpenerOptions = [
  'Howdy, any questions I can help with?',
  'Hey there, any questions I can help with?',
  'Hi, any questions for me?',
  'My dude, any questions for me?',
  'Buenos dias, any questions for me?',
  'Good morning my good sir, any questions for me?',
]

function getSystemMessages(unitContent: string): Message[] {
  return [
    {
      id: 'system-1',
      content: `You are a helpful tutor. You give good, accurate, careful responses to student's questions. Think step by step.`,
      role: 'system',
    },
    {
      id: 'system-2',
      content: `Here's some useful context as to what the student is working on:\n ${unitContent}`,
      role: 'system',
    },
    {
      id: 'assistant-1',
      content: sample(assistantOpenerOptions)!,
      role: 'assistant',
    },
  ]
}
