const request = require('supertest')
const app = require('../app')

describe('GET /members', () => {
  it('should return all members', (done) => {
    /*
    // Arrange: This is where you initialize objects and set the value of the data
    // to be passed to the function under test. This is also the best place
    // to set up mocks if we intend to use them.
    // const arr = [9, 2, 8, 5]
    */

    /*
    // Act: The act section invokes the function under test.
    // const value = isNumberInArray(num, arr)
    */

    /* Assert: This is where you verify that the action of the function under
    // test behaves as expected.
    // expect(value).toBe(expected)
    */
    request(app).get('/members').expect(200, done)
  })
})
