import { serve } from 'inngest/next'

import { inngest } from '@/server/jobs/client'
import { courseGenerate } from '@/server/jobs/functions/course-generate'
import { courseSubscribe } from '@/server/jobs/functions/course-subscribe'
import { helloWorld } from '@/server/jobs/functions/hello-world'

export const config = {
  runtime: 'edge',
}

// Create an API that serves zero functions
export default serve(
  inngest,
  [
    /* your functions will be passed here later! */
    helloWorld,
    courseGenerate,
    courseSubscribe,
  ],
  {
    streaming: 'allow',
  },
)
