import ChatSidebar from '@/components/chat-sidebar/chat-sidebar'
import CourseSidebar from '@/components/course-sidebar/course-sidebar'
import {courses} from '@/components/dummy'
import SessionContent from '@/components/session-content/session-content'

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <CourseSidebar courses={courses} />
      <SessionContent content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl." />
      <ChatSidebar messages={[{sender: 'Bot', text: 'Hello!'}]} />
    </div>
  )
}
