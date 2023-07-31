import { inngest } from '../client'

export const helloWorld = inngest.createFunction(
  { name: 'Hello World' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('1s')
    return { event, body: 'Hello, World!' }
  },
)
