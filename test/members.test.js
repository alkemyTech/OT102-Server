const request = require('supertest')
const { expect } = require('chai')
const { generateToken } = require('../middlewares/jwt')
const {
  getMemberById,
  deleteMemberPermanently,
  addMember,
} = require('../services/members')
app = require('../app')

describe('/members', () => {
  /* Define the parameters, and then in each test, 
  change one parameter that clear aligns with the name of the test. */
  const URL = '/members'
  let token
  let member

  beforeEach(() => {
    // example use for beforeEach
    member = { name: 'Johnn Doe', image: 'some.image.url' }
    token = generateToken({ name: 'test', userRole: 'Admin' })
  })

  afterEach(async () => {
    // closer server
    // clean up db
  })

  //  Using the 3A pattern. Arrange, Act, Assert.
  describe('POST /', () => {
    it('should reject the POST request from non admin user', async () => {
      /* Arrange: This is where you initialize objects and set the value of the data
      to be passed to the function under test. This is also the best place
      to set up mocks if we intend to use them. */
      token = generateToken({ name: 'test' })

      /* Act: The act section invokes the function under test. */
      const response = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(member)

      /* Assert: This is where you verify that the action of the function under
      test behaves as expected. */
      expect(response.status).to.be.equal(401) // fix middleware. code must be 403
      expect(response.body)
        .to.have.property('message')
        .match(/forbidden/i)
    })

    it('should reject the POST request without token', async () => {
      /* Act */
      const response = await request(app).post(URL).send(member)

      expect(response.status).to.be.equal(401)
      expect(response.body)
        .to.have.property('message')
        .match(/no token/i)
    })

    it('should reject the POST request with missing name property', async () => {
      delete member.name

      const response = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(member)

      expect(response.status).to.be.equal(400)
      expect(response.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(response.body).to.have.property('errors').to.be.an('array')
    })

    it('should reject the POST request with missing image property', async () => {
      delete member.image

      const response = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(member)

      expect(response.status).to.be.equal(400)
      expect(response.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(response.body).to.have.property('errors').to.be.an('array')
    })

    it('should add a new member to the database', async () => {
      /* Act */
      const response = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(member)
      const memberId = response.body.body.id
      const createdMember = await getMemberById(memberId)

      expect(response.status).to.be.equal(201)
      expect(createdMember).to.not.be.null
      expect(createdMember).to.have.property('name').equal('Johnn Doe')
      expect(createdMember).to.have.property('image').equal('some.image.url')
      //clean up
      await deleteMemberPermanently(createdMember.id)
    })

    it('should return the new member', async () => {
      /* Act */
      const response = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(member)

      const createdMember = response.body.body
      expect(response.status).to.be.equal(201)
      expect(createdMember).to.have.property('id').to.not.be.null
      expect(createdMember).to.have.property('name').equal('Johnn Doe')
      expect(createdMember).to.have.property('image').equal('some.image.url')
      //clean up
      await deleteMemberPermanently(createdMember.id)
    })
  })

  describe('PUT /', () => {
    const mockUpdateURL = `${URL}/1`

    it('should reject the PUT request without token', async () => {
      /* Act */
      const response = await request(app).put(mockUpdateURL).send(member)

      expect(response.status).to.be.equal(401)
      expect(response.body)
        .to.have.property('message')
        .match(/no token/i)
    })

    it('should reject the PUT request from non admin user', async () => {
      token = generateToken({ name: 'test' })

      const response = await request(app)
        .put(mockUpdateURL)
        .set({ 'x-access-token': token })
        .send(member)

      // fix middleware. code must be 403
      expect(response.status).to.be.equal(401)
      expect(response.body)
        .to.have.property('message')
        .match(/forbidden/i)
    })

    it('should reject the PUT request with missing name property', async () => {
      delete member.name

      const response = await request(app)
        .put(mockUpdateURL)
        .set({ 'x-access-token': token })
        .send(member)

      expect(response.status).to.be.equal(400)
      expect(response.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(response.body).to.have.property('errors').to.be.an('array')
    })

    it('should reject the PUT request with missing image property', async () => {
      delete member.image

      const response = await request(app)
        .put(mockUpdateURL)
        .set({ 'x-access-token': token })
        .send(member)

      expect(response.status).to.be.equal(400)
      expect(response.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(response.body).to.have.property('errors').to.be.an('array')
    })

    it('should reject the PUT request with wrong ID', async () => {
      const wrongId = '999999999999999'

      const response = await request(app)
        .put(`${URL}/${wrongId}`)
        .set({ 'x-access-token': token })
        .send(member)

      expect(response.status).to.be.equal(404)
      expect(response.body)
        .to.have.property('message')
        .match(/not found/i)
    })

    it('should update a member in the database', async () => {
      const newMember = await addMember(member)

      const response = await request(app)
        .put(`${URL}/${newMember.id}`)
        .set({ 'x-access-token': token })
        .send({ ...member, name: 'Doe, johnn' })

      const updatedMember = await getMemberById(newMember.id)
      expect(updatedMember).to.have.property('name').equal('Doe, johnn')

      //clean up
      await deleteMemberPermanently(newMember.id)
    })

    it('should return the updated member', async () => {
      const newMember = await addMember(member)

      const response = await request(app)
        .put(`${URL}/${newMember.id}`)
        .set({ 'x-access-token': token })
        .send({ ...member, name: 'Doe, johnn' })
      const updatedMember = response.body.body

      expect(response.status).to.be.equal(200)
      expect(updatedMember).to.have.property('name').equal('Doe, johnn')
      expect(updatedMember).to.have.property('image').equal('some.image.url')

      //clean up
      await deleteMemberPermanently(newMember.id)
    })
  })

  describe('DELETE /', () => {
    const deleteURL = `${URL}/1`
    let newMember

    beforeEach(async () => {
      // create a member to delete before each test
      newMember = await addMember(member)
    })

    afterEach(async () => {
      // clean up deleting member after each test
      // if assert fails the new test member must be deleted.
      await deleteMemberPermanently(newMember.id)
    })

    it('should reject the DELETE request without token', async () => {
      const response = await request(app).delete(deleteURL).send()

      expect(response.status).to.be.equal(401)
      expect(response.body)
        .to.have.property('message')
        .match(/no token/i)
    })

    it('should reject the DELETE request from non admin user', async () => {
      token = generateToken({ name: 'test' })

      const response = await request(app)
        .delete(deleteURL)
        .set({ 'x-access-token': token })
        .send()

      // fix middleware. code must be 403
      expect(response.status).to.be.equal(401)
      expect(response.body)
        .to.have.property('message')
        .match(/forbidden/i)
    })

    it('should respond 404 to the DELETE request with wrong ID', async () => {
      const wrongId = '999999999999999'

      const response = await request(app)
        .delete(`${URL}/${wrongId}`)
        .set({ 'x-access-token': token })
        .send()

      expect(response.status).to.be.equal(404)
      expect(response.body)
        .to.have.property('message')
        .match(/not found/i)
    })

    it('should delete the member in the data base', async () => {
      /* Act */
      const response = await request(app)
        .delete(`${URL}/${newMember.id}`)
        .set({ 'x-access-token': token })
        .send()

      try {
        await getMemberById(newMember.id)
      } catch (error) {
        expect(error)
          .to.have.property('message')
          .match(/not found/i)
      }
    })

    it('should return the deleted member', async () => {
      /* Act */
      const response = await request(app)
        .delete(`${URL}/${newMember.id}`)
        .set({ 'x-access-token': token })
        .send()
      const deletedMember = response.body.body

      expect(response.status).to.be.equal(200)
      expect(deletedMember).to.have.property('name').equal('Johnn Doe')
      expect(deletedMember).to.have.property('image').equal('some.image.url')
      expect(deletedMember).to.have.property('deletedAt').to.not.be.null
    })
  })

  describe('GET /', () => {
    it('should return all members array', async () => {
      const res = await request(app).get(URL)

      expect(res.status).to.be.equal(200)
      expect(res.body.body).to.be.an('array')
    })

    it('should return members objects with "name" and "image" properties', async () => {
      const res = await request(app).get(URL)

      expect(res.body.body[0]).to.be.an('object')
      expect(res.body.body[0]).to.have.property('name')
      expect(res.body.body[0]).to.have.property('image')
    })
  })
})
