import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components'
import { Markdown } from '@react-email/markdown'

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

  email: string
}

export function CourseUnitEmail({
  course,
  courseModule,
  courseUnit,
  email,
}: CourseUnitEmailProps) {
  const unitUrl = `${baseUrl}/api/redirects/courses/${courseUnit.id}`
  const unsubscribeLink = `${baseUrl}/courses/${course.id}/unsubscribe?email=${email}`

  return (
    <Html>
      <Head />
      <Body className="bg-background my-auto mx-auto font-sans">
        <Container className="rounded-lg border bg-card text-card-foreground shadow-sm my-[40px] mx-auto p-[20px] w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src={`${baseUrl}/static/logo.png`}
              width="40"
              height="37"
              alt="101.school"
              className="my-0 mx-auto"
            />
          </Section>
          <Heading className="text-xl font-semibold leading-none tracking-tight">
            {course.title} - Module {courseModule.number} - Unit {courseUnit.number}
          </Heading>
          <Heading className="text-2xl font-semibold leading-none tracking-tight">
            {courseUnit.title}
          </Heading>
          <Markdown>{courseUnit.content}</Markdown>
          <Text className="leading-6">
            <Link href={unitUrl} className="text-blue-600 no-underline">
              View the unit
            </Link>
          </Text>

          <Text className="leading-6">
            <Link href={unsubscribeLink} className="text-blue-600 no-underline">
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
