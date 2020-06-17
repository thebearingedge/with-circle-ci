const express = require('express')

module.exports = function createServer({ db }) {

  const app = express()

  app.get('/', (req, res, next) => {
    db.query(`select 'success!' as "message"`)
      .then(({ rows: [row] }) => {
        res.send(`
           <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${row.message}</title>
          </head>
          <body>
            <h1>${row.message}</h1>
          </body>
          </html>
        `)
      })
      .catch(err => {
        console.error(err)
        res.status(500).send(`
           <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Error</title>
          </head>
          <body>
            <h1>an unexpected error occurred</h1>
          </body>
          </html>
        `)
      })
  })

  app.get('/api', (req, res, next) => {
    db.query(`select 'success!' as "message"`)
      .then(({ rows: [row] }) => {
        res.json({ message: row.message })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ error: 'an unexpected error occurred' })
      })
  })

  return app
}
