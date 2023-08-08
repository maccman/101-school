import { neonConfig } from '@neondatabase/serverless'
import { CamelCasePlugin, Kysely } from 'kysely'
import { NeonHTTPDialect } from 'kysely-neon'

import { assertString } from '@/plugins/assert'

import { DB } from './schema'

// Are we in a Node.js environment?
if (typeof WebSocket === 'undefined') {
  neonConfig.webSocketConstructor = require('ws')
}

assertString(process.env.DATABASE_URL, 'DATABASE_URL is not set')

export const db = new Kysely<DB>({
  dialect: new NeonHTTPDialect({
    connectionString: process.env.DATABASE_URL,
  }),
  plugins: [new CamelCasePlugin()],
})
