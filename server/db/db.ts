import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import { assertString } from '@/lib/assert'

import { DB } from './schema'

assertString(process.env.DATABASE_URL, 'DATABASE_URL is not set')

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }),
})

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
})
