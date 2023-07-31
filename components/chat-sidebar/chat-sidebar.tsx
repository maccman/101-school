import { Message } from 'ai'
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
  ]
}
