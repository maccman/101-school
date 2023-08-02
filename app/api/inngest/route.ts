import { serve } from 'inngest/next'

import { inngest } from '@/server/jobs/client'
import { courseGenerate } from '@/server/jobs/functions/course-generate'
import { helloWorld } from '@/server/jobs/functions/hello-world'

export const runtime = 'edge'

export const { GET, POST, PUT } = serve(inngest, [helloWorld, courseGenerate], {
  streaming: 'allow',
})
