const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect
const { generateToken } = require('../middlewares/jwt')
const {
  deleteTestimonialPermanently,
  getById,
  addTestimonial,
} = require('../services/testimonials')

describe('/testimonials', () => {
  const URL = '/testimonials'
  let token
  let testimonial

  beforeEach(() => {
    testimonial = {
      name: 'Test Name',
      image: 'test.image.url',
      content: 'Test Content',
    }
    token = generateToken({ name: 'test', userRole: 'Admin' })
  })

  afterEach(async () => {
    // Clean up DB
  })

  // Test GET route to retrieve all testimonials. Public Route.
  describe('GET /testimonials', () => {
    it('Route responds with status code of 200', async () => {
      const response = await request(app).get(URL)

      expect(response.status).to.eql(200)
    })
    it('route responds with succesful message', async () => {
      const response = await request(app).get(URL)

      expect(response.body.message).to.eql(
        'Testimonials retrieved successfully',
      )
    })
    it('Response body receives proper keys', async () => {
      const response = await request(app).get(URL)
      const attributes = response.body.body[0] // pick first element of the body array to check for attributes
      expect(attributes).to.include.keys(
        'id',
        'name',
        'image',
        'content',
        'createdAt',
        'updatedAt',
        'deletedAt',
      )
    })
  })

  // Test POST route. Private Route. Creates new testimonial.
  describe('POST /testimonials', () => {
    it('Should reject POST request without token', async () => {
      const postResponse = await request(app).post(URL).send(testimonial)

      expect(postResponse.status).to.eql(401)
      expect(postResponse.body)
        .to.have.property('message')
        .match(/no token/i)
    })

    it('Only allows Admin user to access this route', async () => {
      token = generateToken({ name: 'test' })

      const postResponse = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(testimonial)

      expect(postResponse.status).to.eql(401)
      expect(postResponse.body)
        .to.have.property('message')
        .match(/forbidden/i)
    })

    it('Tests field validation. Name is required', async () => {
      delete testimonial.name

      const postResponse = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(testimonial)

      expect(postResponse.status).to.eql(400)
      expect(postResponse.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(postResponse.body).to.have.property('errors').to.be.an('array')
    })

    it('Tests field validation. Content is required', async () => {
      delete testimonial.content

      const postResponse = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(testimonial)

      expect(postResponse.status).to.eql(400)
      expect(postResponse.body)
        .to.have.property('message')
        .match(/error validating/i)
      expect(postResponse.body).to.have.property('errors').to.be.an('array')
    })

    it('Creates new testimonial', async () => {
      const postResponse = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(testimonial)

      const newTestimonialId = postResponse.body.body.id
      const newTestimonial = await getById(newTestimonialId)

      expect(postResponse.status).to.eql(201)
      expect(newTestimonial).to.not.be.null
      expect(newTestimonial).to.have.property('name').equal('Test Name')
      expect(newTestimonial).to.have.property('image').equal('test.image.url')
      expect(newTestimonial).to.have.property('content').equal('Test Content')
      // Clean-up DB:
      await deleteTestimonialPermanently(newTestimonial.id)
    })

    it('Returns the created testimonial in the response', async () => {
      const postResponse = await request(app)
        .post(URL)
        .set({ 'x-access-token': token })
        .send(testimonial)

      const newTestimonial = postResponse.body.body

      expect(postResponse.status).to.eql(201)
      expect(newTestimonial).to.have.property('id').to.not.be.null
      expect(newTestimonial).to.have.property('name').equal('Test Name')
      expect(newTestimonial).to.have.property('image').equal('test.image.url')
      expect(newTestimonial).to.have.property('content').equal('Test Content')
      // Clean-up DB:
      await deleteTestimonialPermanently(newTestimonial.id)
    })
  })

  // Test GET route to retrieve only 1 testimonial by ID. Public Route.
  describe('GET /testimonials/:id', () => {
    it('Gets Testimonial by ID', async () => {
      const newTestimonial = await addTestimonial(testimonial)
      const id = newTestimonial.id

      const response = await request(app).get(`${URL}/${id}`)
      const attributes = response.body.body

      expect(response.status).to.eql(200)
      expect(response.body.message).to.eql(
        'Testimonial retrieved successfully.',
      )
      expect(attributes).to.include.keys(
        'id',
        'name',
        'image',
        'content',
        'createdAt',
        'updatedAt',
        'deletedAt',
      )
      // Clean-up DB:
      await deleteTestimonialPermanently(id)
    })

    it('Route responds with status code of 404, when passing non existing ID', async () => {
      const response = await request(app).get(`${URL}/0`)

      expect(response.status).to.eql(404)
    })
  })

  // Tests Put route. Private route. Updates existing testimonials.
  describe('PUT /testimonials/:id', () => {
    let newTestimonial

    beforeEach(async () => {
      // Create a testimonial to update before each test.
      newTestimonial = await addTestimonial(testimonial)
    })

    afterEach(async () => {
      // Clean up DB after each test.
      await deleteTestimonialPermanently(newTestimonial.id)
    })

    it('Only allows Admin user to access this route', async () => {
      token = generateToken({ name: 'test' })

      const updateResponse = await request(app)
        .put(`${URL}/1`)
        .set({ 'x-access-token': token })
        .send(testimonial)
      expect(updateResponse.status).to.eql(401)
      expect(updateResponse.body)
        .to.have.property('message')
        .match(/forbidden/i)
    })
    it('Returns Status code 404 with non existing ID', async () => {
      const postResponse = await request(app)
        .put(`${URL}/0`)
        .set({ 'x-access-token': token })
        .send(testimonial)

      expect(postResponse.status).to.eql(404)
    })
    it('Updates testimonial', async () => {
      const id = newTestimonial.id
      let updatedTestimonial
      const updateResponse = await request(app)
        .put(`${URL}/${id}`)
        .set({ 'x-access-token': token })
        .send({
          name: 'Updated Test Name',
          image: 'updated.image.url',
          content: 'Updated Test Content',
        })

      if (updateResponse) {
        updatedTestimonial = await getById(id)
        return updatedTestimonial
      }

      expect(updateResponse.status).to.eql(200)
      expect(updatedTestimonial)
        .to.have.property('name')
        .eql('Updated Test Name')
      expect(updatedTestimonial)
        .to.have.property('image')
        .eql('updated.image.url')
      expect(updatedTestimonial)
        .to.have.property('content')
        .eql('Updated Test Content')
    })
  })

  // Tests Delete Route. Private Route. Deletes Testimonial.
  describe('DELETE /testimonials/:id', () => {
    let newTestimonial

    beforeEach(async () => {
      // Create a testimonial to delete before each test.
      newTestimonial = await addTestimonial(testimonial)
    })

    afterEach(async () => {
      // Clean up DB after each test.
      await deleteTestimonialPermanently(newTestimonial.id)
    })

    it('Only allows Admin user to access this route', async () => {
      token = generateToken({ name: 'test' })

      const deleteResponse = await request(app)
        .delete(`${URL}/1`)
        .set({ 'x-access-token': token })
        .send()

      expect(deleteResponse.status).to.eql(401)
      expect(deleteResponse.body)
        .to.have.property('message')
        .match(/forbidden/i)
    })
    it('Returns Status code 404 with non existing ID', async () => {
      const deleteResponse = await request(app)
        .delete(`${URL}/0`)
        .set({ 'x-access-token': token })
        .send()

      expect(deleteResponse.status).to.eql(404)
    })
    it('Deletes testimonial', async () => {
      const id = newTestimonial.id

      const deleteResponse = await request(app)
        .delete(`${URL}/${id}`)
        .set({ 'x-access-token': token })
        .send()

      expect(deleteResponse.status).to.eql(200)
    })
  })
})
