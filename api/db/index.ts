const config = {
  db: 'rabble-testing',
}

const r = require('rethinkdbdash')(config)

export { r as db }
