import { Button } from '@react-email/button'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Text } from '@react-email/text'

export function HelloWorldEmail() {
  return (
    <Html lang="en">
      <Text>Some title</Text>
      <Hr />
      <Button href="https://example.com">Click me</Button>
    </Html>
  )
}

export default HelloWorldEmail
