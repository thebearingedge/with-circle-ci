require('dotenv/config')
const express = require('express')
const createServer = require('./server/create-server')
const connectToPostgres = require('./server/connect-to-postgres')

;(async () => {
  const db = await connectToPostgres()
  const app = createServer({ db })
  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
  })
})().catch(err => {
  console.error(err)
  process.exit(1)
})
