import { serve } from 'inngest/next'

import { inngest } from '@/server/jobs/client'
import { courseGenerate } from '@/server/jobs/functions/course-generate'
import { courseSubscribe } from '@/server/jobs/functions/course-subscribe'

export const runtime = 'edge'

export default serve({
  client: inngest,
  functions: [courseGenerate, courseSubscribe],
  streaming: 'allow',
})
