import { Message } from 'ai'
import sample from 'lodash/sample'
import { notFound } from 'next/navigation'

import { getUnitChat } from '@/server/db/unit_chats/getters'
import { getUnit } from '@/server/db/units/getters'
import { auth } from '@/server/helpers/auth'

import { ChatSidebarClient } from './chat-sidebar-client'
import { unitMessageToChatMessage } from './utils'

interface ChatSidebarProps {
  unitId: string
  className?: string
}

export async function ChatSidebar({ unitId, className }: ChatSidebarProps) {
  const [userId, unit] = await Promise.all([auth(), getUnit(unitId)])

  if (!unit) {
    notFound()
  }

  const initialMessages = await getInitialMessages({
    userId,
    unitId,
    unitContent: unit.content,
  })

  return (
    <ChatSidebarClient
      unitId={unitId}
      userId={userId}
      initialMessages={initialMessages}
      className={className}
    />
  )
}

async function getInitialMessages({
  userId,
  unitId,
  unitContent,
}: {
  userId: string | null
  unitId: string
  unitContent: string
}): Promise<Message[]> {
  const unitChat = userId ? await getUnitChat({ userId, unitId }) : null
  const unitMessages = unitChat?.messages ?? []

  if (unitChat) {
    return unitMessages.map(unitMessageToChatMessage)
  } else {
    return getDefaultMessages(unitContent)
  }
}

const assistantOpenerOptions = [
  'Howdy, any questions I can help with?',
  'Hey there, any questions I can help with?',
  'Hi, any questions for me?',
  'My dude, any questions for me?',
  'Buenos dias, any questions for me?',
  'Good morning my good sir, any questions for me?',
]

function getDefaultMessages(unitContent: string): Message[] {
  return [
    {
      id: 'system-1',
      content: `You are a helpful tutor. You give good, accurate, careful responses to student's questions. Think step by step. Output text as markdown.`,
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
