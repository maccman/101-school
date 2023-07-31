import { HeaderLayout } from '@/components/layouts/header-layout'

export default function About() {
  return (
    <HeaderLayout>
      <div className="prose p-10 prose-headings:text-xl">
        <h1>About</h1>
        <p>101.school is an experiment in creating AI generated course contents.</p>

        <p>
          You enter a subject you&apos;re curious about and we generate a 13 week course.
        </p>

        <p>
          An <a href="https://alexmaccaw.com">Alex MacCaw</a> project.
        </p>
      </div>
    </HeaderLayout>
  )
}
