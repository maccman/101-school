import { serve } from 'inngest/next'

import { inngest } from '@/server/inngest/client'
import { helloWorld } from '@/server/inngest/functions/hello-world'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve(inngest, [
  /* your functions will be passed here later! */
  helloWorld,
])
