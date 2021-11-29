const createHttpError = require('http-errors')
const { updateById } = require('../services/testimonials')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/index')

module.exports = {
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
}
