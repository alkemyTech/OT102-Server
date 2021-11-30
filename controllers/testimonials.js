const createHttpError = require('http-errors')

const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getAllTestimonials } = require('../services/testimonials')

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
}
