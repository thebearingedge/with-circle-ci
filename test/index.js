const cypress = require('cypress')
const createServer = require('../server/create-server')
const connectToPostgres = require('../server/connect-to-postgres')

const { ORIGIN, PORT, CI } = process.env

  ;(async () => {
    const [, , mode = 'open'] = process.argv
    const db = await connectToPostgres()
    const server = await createServer({ db })
    server.listen(PORT, async () => {
      const options = {
        env: process.env,
        browser: 'chrome',
        headed: typeof CI === 'undefined',
        config: {
          baseUrl: ORIGIN
        }
      }
      if (mode === 'open') {
        options.config.defaultCommandTimeout = 5000
        return cypress.open(options)
      }
      try {
        const results = await cypress.run(options)
        results.totalFailed
          ? process.exit(1)
          : process.exit(0)
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })()
