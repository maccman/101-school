import React from 'react'

interface Props {
  content: string
}

const SessionContent: React.FC<Props> = ({content}) => {
  return (
    <div className="w-1/2 mx-6 bg-white rounded shadow-lg p-5 overflow-auto">
      {content.split('\n').map((para, i) => (
        <p key={i} className="text-gray-700 mb-4">
          {para}
        </p>
      ))}
    </div>
  )
}

export default SessionContent
