const request = require('supertest')
const app = require('../app')
const { expect } = require('chai')
const {
  deleteContactPermanently,
  getById,
} = require('../services/contacts')

describe('/contacts', () => {
  const URL = '/contacts'
  let contacts
  let attributes

  beforeEach(() => {
    contacts = {
      name: 'Test Name Contacts', // no null
      phone: '54111222333',
      email: 'test-contacts@mail.com', // no null
      message: 'Test Message Contacts',
    }
    attributes = [
      'id',
      'name',
      'phone',
      'email',
      'message',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ]
  })

  // Test GET route to retrieve all contacts. Public Route.
  describe('GET /contacts', () => {
    it('Route reponds with status code of 200', async () => {
      const response = await request(app).get(URL)
      expect(response.status).to.eql(200)
    })
    it('Route responds with status true', async () => {
      const reponse = await request(app).get(URL)
      expect(reponse.body.status).to.eql(true)
    })
    it('Route responds with successful message', async () => {
      const response = await request(app).get(URL)
      expect(response.body.message).to.eql(
        'Contacts were retrieved successfully.'
      )
    })
    it('Response body receives property keys', async () => {
      const response = await request(app).get(URL)
      const responseArray = response.body.body[0]
      
      expect(responseArray).to.have.all.keys(attributes)
    })
  })
  //Test POST route to retrieve all contacts. Public Route.
  describe('POST /contacts', () => {
    it('Test field validation. Name is required', async () => {
      delete contacts.name

      const postReponse = await request(app)
        .post(URL)
        .send(contacts)

      expect(postReponse.status).to.eql(400)
      expect(postReponse.body.status).to.eql(false)
      expect(postReponse.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(postReponse.body)
        .to.have.property('errors').to.be.an('array')
    })

    it('Test field validation. Email is required', async () => {
      delete contacts.email

      const postResponse = await request(app)
        .post(URL)
        .send(contacts)

      expect(postResponse.status).to.eql(400)
      expect(postResponse.body.status).to.eql(false)
      expect(postResponse.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(postResponse.body)
        .to.have.property('errors').to.be.an('array')
    })
    
    it('Create new contact', async () => {
      const postResponse = await request(app)
        .post(URL)
        .send(contacts)

        const newContactId = postResponse.body.body.id
        const newContact = await getById(newContactId)

        expect(postResponse.status).to.eql(201)
        expect(newContact).to.not.be.null
        expect(newContact).to.have.property('name').equal(contacts.name)
        expect(newContact).to.have.property('phone').equal(contacts.phone)
        expect(newContact).to.have.property('email').equal(contacts.email)
        expect(newContact).to.have.property('message').equal(contacts.message)

        // Clean-up DB
        await deleteContactPermanently(newContact.id)
    })
  })
})

