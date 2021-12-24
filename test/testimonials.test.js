const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect

// Test GET route to retrieve all testimonials. Public Route.
describe('GET /testimonials', () => {
  it('Route responds with status code of 200', async () => {
    const response = await request(app).get('/testimonials')

    expect(response.status).to.eql(200)
  })
  it('route responds with succesful message', async () => {
    const response = await request(app).get('/testimonials')

    expect(response.body.message).to.eql('Testimonials retrieved successfully')
  })
  it('Response body receives proper keys', async () => {
    const response = await request(app).get('/testimonials')
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
  it('Only allows Admin user to access this route', async () => {
    const postResponse = await request(app).post('/testimonials').send({
      name: 'Test Name',
      image: 'Test Img Url',
      content: 'Test Content',
    })
    expect(postResponse.status).to.eql(401)
  })
  it('Tests field validation. Name is required', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token
    const postResponse = await request(app)
      .post('/testimonials')
      .set('x-access-token', token)
      .send({
        name: '',
        image: 'Test Img Url',
        content: 'Test Content',
      })
    expect(postResponse.status).to.eql(400)
  })
  it('Tests field validation. Content is required', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token
    const postResponse = await request(app)
      .post('/testimonials')
      .set('x-access-token', token)
      .send({
        name: 'Test Name',
        image: 'Test Img Url',
      })
    expect(postResponse.status).to.eql(400)
  })
  it('Creates new testimonial', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token
    const postResponse = await request(app)
      .post('/testimonials')
      .set('x-access-token', token)
      .send({
        name: 'Test Name',
        image: 'Test Img Url',
        content: 'Test Content',
      })
    expect(postResponse.status).to.eql(201)
  })
})

// Test GET route to retrieve only 1 testimonial by ID. Public Route.
describe('GET /testimonials/:id', () => {
  it('Route responds with status code of 200', async () => {
    const testimonialList = await request(app).get('/testimonials')
    const id = testimonialList.body.body.length
    const response = await request(app).get(`/testimonials/${id}`)

    expect(response.status).to.eql(200)
  })
  it('route responds with succesful message', async () => {
    const testimonialList = await request(app).get('/testimonials')
    const id = testimonialList.body.body.length
    const response = await request(app).get(`/testimonials/${id}`)

    expect(response.body.message).to.eql('Testimonial retrieved successfully.')
  })
  it('Response body receives proper keys', async () => {
    const testimonialList = await request(app).get('/testimonials')
    const id = testimonialList.body.body.length
    const response = await request(app).get(`/testimonials/${id}`)
    const attributes = response.body.body
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
  it('Route responds with status code of 404, when passing non existing ID', async () => {
    const response = await request(app).get('/testimonials/0')

    expect(response.status).to.eql(404)
  })
})

// Tests Put route. Private route. Updates existing testimonials.
describe('PUT /testimonials/:id', () => {
  it('Only allows Admin user to access this route', async () => {
    const postResponse = await request(app).put('/testimonials/5').send({
      name: 'Test Name',
      image: 'Test Img Url',
      content: 'Test Content',
    })
    expect(postResponse.status).to.eql(401)
  })
  it('Returns Status code 404 with non existing ID', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token

    const postResponse = await request(app)
      .put(`/testimonials/0`)
      .set('x-access-token', token)
      .send({
        name: 'Updated Test Name',
        image: 'Updated Test Img Url',
        content: 'Updated Test Content',
      })
    expect(postResponse.status).to.eql(404)
  })
  it('Updates testimonial', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token
    const testimonialList = await request(app).get('/testimonials')
    const id = testimonialList.body.body.length

    const postResponse = await request(app)
      .put(`/testimonials/${id}`)
      .set('x-access-token', token)
      .send({
        name: 'Updated Test Name',
        image: 'Updated Test Img Url',
        content: 'Updated Test Content',
      })
    expect(postResponse.status).to.eql(200)
  })
})

// Tests Delete Route. Private Route. Deletes Testimonial.
describe('DELETE /testimonials/:id', () => {
  it('Only allows Admin user to access this route', async () => {
    const postResponse = await request(app).delete('/testimonials/5').send({
      name: 'Test Name',
      image: 'Test Img Url',
      content: 'Test Content',
    })
    expect(postResponse.status).to.eql(401)
  })
  it('Returns Status code 500 with non existing ID', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token

    const postResponse = await request(app)
      .delete(`/testimonials/0`)
      .set('x-access-token', token)

    expect(postResponse.status).to.eql(500)
  })
  it('Deletes testimonial', async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'testing@test.com', password: 'Test2021!' })

    const token = login.body.body.token
    const testimonialList = await request(app).get('/testimonials')
    const id = testimonialList.body.body.length

    const postResponse = await request(app)
      .delete(`/testimonials/${id}`)
      .set('x-access-token', token)

    expect(postResponse.status).to.eql(200)
  })
})
