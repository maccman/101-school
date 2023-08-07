import { Body, Head, Heading, Html, Img, Link, Section } from '@react-email/components'
import { Markdown } from '@react-email/markdown'

import { Container } from './components/container'
import { styles } from './styles'
import { baseUrl } from './utils'

interface CourseUnitEmailProps {
  course: {
    id: string
    title: string
  }

  courseModule: {
    number: number
  }

  courseUnit: {
    id: string
    title: string
    number: number
    content: string
  }

  nextCourseUnit?: {
    title: string
  } | null

  email: string
}

export function CourseUnitEmail({
  course,
  courseModule,
  courseUnit,
  nextCourseUnit,
  email,
}: CourseUnitEmailProps) {
  const unitUrl = `${baseUrl}/api/redirect/units/${courseUnit.id}`
  const unsubscribeLink = `${baseUrl}/courses/${course.id}/unsubscribe?email=${email}`

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container} unsubscribeLink={unsubscribeLink}>
          <Section style={styles.section}>
            <Img
              src={`${baseUrl}/static/logo.png`}
              width="60"
              alt="101.school"
              style={styles.logo}
            />
          </Section>

          <Heading style={styles.heading}>
            <Link href={unitUrl} style={styles.link}>
              {course.title} / {courseModule.number}.{courseUnit.number}
            </Link>
          </Heading>

          <Markdown
            markdownContainerStyles={{
              padding: '10px 0',
            }}
            markdownCustomStyles={{
              h1: styles.markdownHeading,
              h2: styles.markdownHeading,
              h3: styles.markdownHeading,
              h4: styles.markdownHeading,
              codeInline: { background: 'grey' },
            }}
          >
            {courseUnit.content}
          </Markdown>

          {nextCourseUnit && (
            <Section style={styles.section}>
              In the next unit, we will learn about <em>{nextCourseUnit.title}</em>.
            </Section>
          )}
        </Container>
      </Body>
    </Html>
  )
}
