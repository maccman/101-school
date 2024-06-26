import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Link } from '@react-email/link'
import { Img } from '@react-email/img'
import { Preview } from '@react-email/preview'
import { Html } from '@react-email/html'
import { Head } from '@react-email/head'
import { Body } from '@react-email/body'

import '@/app/globals.css'

import { Container } from './components/container'
import { styles } from './styles'
import { formatName } from './utils'
import { baseUrl } from '../helpers/base-url'

interface CourseCreatedEmailProps {
  userName: string | null
  courseSlug: string
  courseTitle: string
  courseDescription: string
}

export function CourseCreatedEmail({
  userName,
  courseSlug,
  courseTitle,
  courseDescription,
}: CourseCreatedEmailProps) {
  const previewText = `Course '${courseTitle}' created`
  const courseUrl = `${baseUrl}/courses/${courseSlug}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={{ ...styles.container, maxWidth: '500px' }}>
          <Section style={styles.section}>
            <Img
              src={`${baseUrl}/static/logo.png`}
              width="60"
              alt="101.school"
              style={styles.logo}
            />
          </Section>
          <Text style={styles.text}>
            Hello{userName ? ` ${formatName(userName)}` : ' there'},
          </Text>
          <Text style={styles.text}>
            Your course titled <strong>{courseTitle}</strong> has been generated.
          </Text>
          <Text style={styles.text}>
            As a reminder, here is the course&apos;s description:{' '}
            <em>{courseDescription}</em>
          </Text>
          <Text style={styles.text}>
            You can view your course here:{' '}
            <Link href={courseUrl} style={styles.link}>
              {courseUrl}
            </Link>
          </Text>
          <Text style={styles.text}>
            If there are any issues with your course, or if you have any feedback, please
            reply to this email.
          </Text>
          <Text style={styles.text}>Thanks!</Text>
        </Container>
      </Body>
    </Html>
  )
}
