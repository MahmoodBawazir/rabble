import knex from 'knex'
import _ from 'lodash'
import convertToCamel from 'camelcase-keys'

import { __PROD__ } from '../../shared/constants'

require('dotenv').config()

const db = knex({
  client: 'pg',
  connection: __PROD__
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.PG_DB_HOST,
        database: process.env.PG_DB_NAME,
        user: process.env.PG_DB_USER,
        password: process.env.PG_DB_PWD,
      },
  pool: {
    min: 2,
    max: 10,
  },
  postProcessResponse: (result, _queryContext) =>
    Array.isArray(result)
      ? result.map((row) => convertToCamel(row))
      : convertToCamel(result),
  wrapIdentifier: (value, origImpl) =>
    value === '*' ? '*' : origImpl(_.snakeCase(value)),
})

export default db
