const request = require('supertest')
const app = require('../app')

describe('GET /organizations/1/public', () => {
  it('respond with organizations', (done) => {
    const bodyResponse = {
      "status": true,
      "data": {
        "name": "organization1",
        "image": "asd",
        "phone": "11111",
        "adress": "adress organization1",
        "welcomeText": "hello world",
      },
      "msg": "Sucessfull!"
    }
    request(app).get('/organizations/1/public').expect(bodyResponse, done)
  })
})
