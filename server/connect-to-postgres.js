const pg = require('pg')
const retry = require('promise-retry')
const e = require('express')

module.exports = function connectToPostgres() {
  return retry(async retry => {
    try {
      const db = new pg.Pool({
        connectionString: process.env.DATABASE_URL
      })
      await db.query('select 1')
      return db
    } catch (err) {
      if (e.code === 'ETIMEDOUT') throw err
      return retry(err)
    }
  })
}
