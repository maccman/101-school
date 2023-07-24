// ChatWidget.tsx
import React from 'react'

interface Message {
  sender: string
  text: string
}

interface Props {
  messages: Message[]
}

const ChatSidebar: React.FC<Props> = ({ messages }) => {
  return (
    <div className="p-5 overflow-hidden border-l flex flex-col">
      <h2 className="font-semibold text-xl mb-4 flex-none">Chat</h2>
      <div className="flex-grow overflow-auto p-3 space-y-4 mb-4 border rounded">
        {messages.map((message, i) => (
          <div key={i} className={message.sender === 'Bot' ? 'text-right' : ''}>
            <div
              className={`font-bold mb-1 ${
                message.sender === 'Bot' ? 'text-blue-500' : ''
              }`}
            >
              {message.sender}
            </div>
            <div
              className={`bg-${
                message.sender === 'Bot' ? 'blue-200' : 'gray-200'
              } rounded-lg py-2 px-3 inline-block text-sm text-gray-700`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input flex-none">
        <input
          className="w-full rounded border p-2"
          type="text"
          placeholder="Type your message..."
        />
      </div>
    </div>
  )
}

export default ChatSidebar
