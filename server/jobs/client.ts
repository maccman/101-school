import { EventSchemas, Inngest } from 'inngest'

type Events = {
  'test/hello.world': {
    data: {}
  }

  'course/generate': {
    data: {
      courseId: string
    }
  }
}

// Create a client to send and receive events
export const inngest = new Inngest({
  name: '101-school',
  schemas: new EventSchemas().fromRecord<Events>(),
})
