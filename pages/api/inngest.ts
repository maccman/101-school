import { serve } from 'inngest/next'

import { inngest } from '@/server/jobs/client'
import { courseGenerate } from '@/server/jobs/functions/course-generate'
import { courseSubscribe } from '@/server/jobs/functions/course-subscribe'

export const config = {
  runtime: 'edge',
}

export default serve(inngest, [courseGenerate, courseSubscribe], {
  streaming: 'allow',
})
