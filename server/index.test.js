const axios = require('axios')
const { expect } = require('chai')
const createServer = require('./create-server')
const connectToPostgres = require('./connect-to-postgres')

describe('create server', () => {

  let db, server

  before(done => {
    ;(async () => {
      db = await connectToPostgres()
      server = createServer({ db }).listen(process.env.PORT, done)
    })().catch(done)
  })

  describe('/api', () => {

    it('returns some JSON', async () => {
      const { status, data } = await axios.get(`${process.env.ORIGIN}/api`)
      expect(status).to.equal(200)
      expect(data).to.deep.equal({ message: 'success' })
    })

  })

  after(done => {
    ;(async () => {
      await db.end()
      server.close(done)
    })().catch(done)
  })

})
