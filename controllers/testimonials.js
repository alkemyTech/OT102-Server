const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getAllTestimonials } = require('../services/testimonials')

module.exports = {
  get: catchAsync(async (req, res) => {
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
      res.status(error.statusCode).json(error)
    }
  }),
}
