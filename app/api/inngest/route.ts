import { serve } from 'inngest/next'

import { inngest } from '@/server/inngest/client'
import { courseGenerate } from '@/server/inngest/functions/course-generate'
import { helloWorld } from '@/server/inngest/functions/hello-world'

export const { GET, POST, PUT } = serve(inngest, [helloWorld, courseGenerate])
