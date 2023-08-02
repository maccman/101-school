import { Body } from '@react-email/body'
import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Heading } from '@react-email/heading'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Tailwind } from '@react-email/tailwind'
import { Text } from '@react-email/text'

interface CourseCreatedEmailProps {
  userName: string | null
  courseSlug: string
  courseTitle: string
  courseDescription: string
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''

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
      <Tailwind>
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
            <Heading className="text-2xl font-semibold leading-none tracking-tight">
              Course &apos;{courseTitle}&apos; created.
            </Heading>
            <Text className="leading-5">
              Hello{userName ? ` ${userName},` : ' there'},
            </Text>
            <Text className="">
              Your course titled <strong>{courseTitle}</strong> has been generated.
            </Text>
            <Text className="text-muted">{courseDescription}</Text>
            <Text className="leading-6">
              You can access your course here:{' '}
              <Link href={courseUrl} className="text-blue-600 no-underline">
                {courseUrl}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
