const { ErrorObject } = require('../helpers/error')
const { Testimonial } = require('../models')

exports.getAllTestimonials = async () => {
  try {
    return await Testimonial.findAll()
  } catch (error) {
    throw new ErrorObject(
      `[Error retreaving testimonials] - [] - ${error.message}`,
      500,
      [error],
    )
  }
}
