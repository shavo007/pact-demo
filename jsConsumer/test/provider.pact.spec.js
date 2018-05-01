const expect = require('chai').expect
const path = require('path')
const chai = require('chai')
const { Pact } = require('@pact-foundation/pact')
const axios = require('axios')

describe('The Hello API', () => {
  let url = 'http://localhost'
  const port = 1234

  const provider =  new Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'JSConsumer',
    provider: 'provider1'
  })

  before(async function()  {
       this.timeout(10000) // it takes time to start the mock server
      await provider.setup()

  })

  after(async function() {
      this.timeout(10000) // it takes time to stop the mock server and gather the contracts
      await provider.finalize()
  })

  describe('get /hello', () => {
    before(done => {
      const interaction = {
          uponReceiving: 'a greeting by awd',
          withRequest: {
              method: 'GET',
              path: '/greetings/awd'
          },
          willRespondWith: {
              status: 200,
              headers: {
                  "Content-Type": "application/json"
              },
              body: {
                  salutation: "Mr.",
                  name: "awd"
              }
          }
      }
       provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    afterEach(() => provider.verify())

    it("should return hello message",  function(done)   {
        sendHelloRequest('awd').then(function(resp) {
            expect(resp.data).to.deep.equal({salutation: "Mr.", name: "awd"});
            done()
        })
    });
  })
})

function sendHelloRequest(name) {

    return axios.request({
      method: 'GET',
      baseURL: 'http://localhost:1234',
      url: '/greetings/' + name ,
      headers: { 'Accept': 'application/json' }
    })
}
