require('dotenv/config')
const connectToPostgres = require('../server/connect-to-postgres')

;(async () => {
  const db = await connectToPostgres()
  await db.end()
})().catch(err => {
  console.error(err)
  process.exit(1)
})
