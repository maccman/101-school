import { HeaderLayout } from '@/components/layouts/header-layout'

export default function About() {
  return (
    <HeaderLayout>
      <div className="prose p-10 prose-headings:text-xl">
        <h1>About</h1>
        <p>101.school is an experiment in creating AI generated course contents.</p>

        <p>
          It works like this: You enter something you&apos;re curious about, and then we
          generate a 13 week course on the subject. You can choose to receive the course
          via email, or read it on the site. We&apos;ll keep track of your progress.
        </p>

        <p>
          An <a href="https://alexmaccaw.com">Alex MacCaw</a> project.
        </p>
      </div>
    </HeaderLayout>
  )
}
