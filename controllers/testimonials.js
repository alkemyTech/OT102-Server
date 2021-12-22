const createHttpError = require('http-errors')
const {
  deleteTestimonial,
  getAllTestimonials,
  updateById,
  addTestimonial,
  getById,
} = require('../services/testimonials')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/index')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const testimonials = await getAllTestimonials()

      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Testimonials retrieved successfully',
        body: testimonials,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  getTestimonial: catchAsync(async (req, res, next) => {
    try {
      const testimonial = await getById(req.params.id)
      endpointResponse({
        res,
        message: 'Testimonial retrieved successfully.',
        body: testimonial,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving testimonial] - [testimonial - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  updateTestimonial: catchAsync(async (req, res, next) => {
    try {
      const updatedTestimonial = await updateById(
        req.params.id,
        req.body.name,
        req.body.image,
        req.body.content,
      )

      endpointResponse({
        res,
        message: 'Testimonial succesfully updated',
        body: updatedTestimonial,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    const { id } = req.params
    try {
      await deleteTestimonial(id)
      endpointResponse({
        res,
        message: 'Testimonial deleted',
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const { name, image, content } = req.body
      const newTestimonial = await addTestimonial({ name, image, content })

      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Testimonial successfully created.',
        body: newTestimonial,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),
}
