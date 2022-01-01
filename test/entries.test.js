const request = require('supertest')
const { expect } = require('chai')
const { generateToken } = require('../middlewares/jwt')
const {
  getEntryById,
  deleteEntryPermanently,
  addEntry,
} = require('../services/entry')
app = require('../app')

describe('/news', () => {
  /* Define the parameters, and then in each test, 
  change one parameter that clear aligns with the name of the test. */
  const URL = '/news'
  let token
  let entry

  beforeEach(() => {
    // example use for beforeEach
    entry = { 
      name: 'Test Name',
      image: 'test.image.url',
      content: 'Test Content',
      categoryId: '1',
      type: 'news'
     }
    token = generateToken({ name: 'test', userRole: 'Admin' })
  })

  afterEach(async () => {
    // closer server
    // clean up db
  })

//  Using the 3A pattern. Arrange, Act, Assert.
  describe('GET /', () => {
    it('should return all entries array', async () => {
      const res = await request(app).get(URL)

      expect(res.status).to.be.equal(200)
      expect(res.body.body).to.be.an('array')
    })

    it('should return entries objects with "name" "image" "content" "categoryId" and "type" properties', async () => {
      const res = await request(app).get(URL)

      expect(res.body.body[0]).to.be.an('object')
      expect(res.body.body[0]).to.have.property('name')
      expect(res.body.body[0]).to.have.property('image')
      expect(res.body.body[0]).to.have.property('content')
      expect(res.body.body[0]).to.have.property('categoryId')
      expect(res.body.body[0]).to.have.property('type')
    })
  })

  describe('GET /:id', () => {
     it('Gets entry by ID', async () => {
      const newEntry = await addEntry(entry)
      const id = newEntry.id

      const response = await request(app).get(`${URL}/${id}`)
      const attributes = response.body.body

      expect(response.status).to.be.equal(200)
      expect(response.body.message).to.eql(
        'Entry retrieved successfully!',
      )
      expect(attributes).to.include.keys(
        'id',
        'name',
        'image',
        'content',
        'categoryId',
        'type',
        'createdAt',
        'updatedAt',
        'deletedAt',
      )
      // Clean-up DB:
      await deleteEntryPermanently(id)
    })
    
    it('Route responds with status code of 404, when passing non existing ID', async () => {
      const response = await request(app).get(`${URL}/0`)

      expect(response.status).to.be.equal(404)
    })
  })

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
      .send(entry)

    /* Assert: This is where you verify that the action of the function under
    test behaves as expected. */
    expect(response.status).to.be.equal(401) // fix middleware. code must be 403
    expect(response.body)
      .to.have.property('message')
      .match(/forbidden/i)
  })

  it('should reject the POST request without token', async () => {
    /* Act */
    const response = await request(app).post(URL).send(entry)

    expect(response.status).to.be.equal(401)
    expect(response.body)
      .to.have.property('message')
      .match(/no token/i)
  })

  it('should reject the POST request with missing name property', async () => {
    delete entry.name
    
    const response = await request(app)
      .post(URL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should reject the POST request with missing image property', async () => {
    delete entry.image

    const response = await request(app)
      .post(URL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should reject the POST request with missing content property', async () => {
    delete entry.content

    const response = await request(app)
      .post(URL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should reject the POST request with missing categoryId property', async () => {
    delete entry.categoryId

    const response = await request(app)
      .post(URL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should add a new entry to the database', async () => {
    /* Act */
    const response = await request(app)
      .post(URL)
      .set({ 'x-access-token': token })
      .send(entry)
    const entryId = response.body.body.id
    const createdEntry = await getEntryById(entryId)

    expect(response.status).to.be.equal(201)
    expect(createdEntry).to.not.be.null
    expect(createdEntry).to.have.property('name').equal('Test Name')
    expect(createdEntry).to.have.property('image').equal('test.image.url')
    expect(createdEntry).to.have.property('content').equal('Test Content')
    expect(createdEntry).to.have.property('categoryId').equal(1)
    expect(createdEntry).to.have.property('type').equal('news')
    //clean up
    await deleteEntryPermanently(createdEntry.id)
  })

  it('should return the new entry', async () => {
    /* Act */
    const response = await request(app)
      .post(URL)
      .set({ 'x-access-token': token })
      .send(entry)

    const createdEntry = response.body.body
    expect(response.status).to.be.equal(201)
    expect(createdEntry).to.have.property('id').to.not.be.null
    expect(createdEntry).to.have.property('name').equal('Test Name')
    expect(createdEntry).to.have.property('image').equal('test.image.url')
    expect(createdEntry).to.have.property('content').equal('Test Content')
    expect(createdEntry).to.have.property('categoryId').equal('1')
    expect(createdEntry).to.have.property('type').equal('news')
    //clean up
    await deleteEntryPermanently(createdEntry.id)
  })
})

describe('PUT /', () => {
  const mockUpdateURL = `${URL}/1`

  it('should reject the PUT request without token', async () => {
    /* Act */
    const response = await request(app).put(mockUpdateURL).send(entry)

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
      .send(entry)

    // fix middleware. code must be 403
    expect(response.status).to.be.equal(401)
    expect(response.body)
      .to.have.property('message')
      .match(/forbidden/i)
  })

  it('should reject the PUT request with missing name property', async () => {
    delete entry.name

    const response = await request(app)
      .put(mockUpdateURL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should reject the PUT request with missing image property', async () => {
    delete entry.image

    const response = await request(app)
      .put(mockUpdateURL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should reject the PUT request with missing content property', async () => {
    delete entry.content

    const response = await request(app)
      .put(mockUpdateURL)
      .set({ 'x-access-token': token })
      .send(entry)

    expect(response.status).to.be.equal(400)
    expect(response.body)
      .to.have.property('message')
      .match(/error validating/i)
    expect(response.body).to.have.property('errors').to.be.an('array')
  })

  it('should reject the PUT request with missing categoryId property', async () => {
    delete entry.categoryId

    const response = await request(app)
      .put(mockUpdateURL)
      .set({ 'x-access-token': token })
      .send(entry)

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
      .send(entry)

    expect(response.status).to.be.equal(404)
    expect(response.body)
      .to.have.property('message')
      .match(/not found/i)
  })

  it('should update a entry in the database', async () => {
    const newEntry = await addEntry(entry)

    const response = await request(app)
      .put(`${URL}/${newEntry.id}`)
      .set({ 'x-access-token': token })
      .send({ ...entry, name: 'Test Name'  })

    const updatedEntry = await getEntryById(newEntry.id)
    expect(updatedEntry).to.have.property('name').equal('Test Name')
    expect(updatedEntry).to.have.property('image').equal('test.image.url')
    expect(updatedEntry).to.have.property('content').equal('Test Content')
    expect(updatedEntry).to.have.property('categoryId').equal(1)
    expect(updatedEntry).to.have.property('type').equal('news')

    //clean up
    await deleteEntryPermanently(newEntry.id)
  })

  it('should return the updated entry', async () => {
    const newEntry = await addEntry(entry)

    const response = await request(app)
      .put(`${URL}/${newEntry.id}`)
      .set({ 'x-access-token': token })
      .send({ ...entry, name: 'Test Name' })
    const updatedEntry = response.body.body

    expect(response.status).to.be.equal(200)
    expect(updatedEntry).to.have.property('name').equal('Test Name')
    expect(updatedEntry).to.have.property('image').equal('test.image.url')
    expect(updatedEntry).to.have.property('content').equal('Test Content')
    expect(updatedEntry).to.have.property('categoryId').equal('1')
    expect(updatedEntry).to.have.property('type').equal('news')

    //clean up
    await deleteEntryPermanently(newEntry.id)
  })
})

describe('DELETE /', () => {
  const mockDeleteURL = `${URL}/1`
  let newEntry

  beforeEach(async () => {
    // create a entry to delete before each test
    newEntry = await addEntry(entry)
  })

  afterEach(async () => {
    // clean up deleting entry after each test
    // if assert fails the new test entry must be deleted.
    await deleteEntryPermanently(newEntry.id)
  })

  it('should reject the DELETE request without token', async () => {
    const response = await request(app).delete(mockDeleteURL).send()

    expect(response.status).to.be.equal(401)
    expect(response.body)
      .to.have.property('message')
      .match(/no token/i)
  })

  it('should reject the DELETE request from non admin user', async () => {
    token = generateToken({ name: 'test' })

    const response = await request(app)
      .delete(mockDeleteURL)
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

  it('should delete the entry in the data base', async () => {
    /* Act */
    const response = await request(app)
      .delete(`${URL}/${newEntry.id}`)
      .set({ 'x-access-token': token })
      .send()

    try {
      await getEntryById(newEntry.id)
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .match(/not found/i)
    }
  })

  it('should return the deleted entry', async () => {
    /* Act */
    const response = await request(app)
      .delete(`${URL}/${newEntry.id}`)
      .set({ 'x-access-token': token })
      .send()
    const deletedEntry = response.body.body

    expect(response.status).to.be.equal(200)
    expect(deletedEntry).to.have.property('name').equal('Test Name')
    expect(deletedEntry).to.have.property('image').equal('test.image.url')
    expect(deletedEntry).to.have.property('content').equal('Test Content')
    expect(deletedEntry).to.have.property('categoryId').equal(1)
    expect(deletedEntry).to.have.property('type').equal('news')
    expect(deletedEntry).to.have.property('deletedAt').to.not.be.null
  })
})

})