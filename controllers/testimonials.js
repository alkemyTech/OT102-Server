const createHttpError = require('http-errors')
const {
  deleteTestimonial,
  getAllTestimonials,
  updateById,
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

  updateTestimonial: catchAsync(async (req, res, next) => {
    try {
      const updatedTestimonial = await updateById(
        req.params.id,
        req.body.name,
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
}
