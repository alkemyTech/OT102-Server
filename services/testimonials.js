const { ErrorObject } = require('../helpers/error')
const { Testimonial } = require('../models')

exports.getAllTestimonials = async () => {
  try {
    return await Testimonial.findAll()
  } catch (error) {
    throw new ErrorObject(error.message, 500)
  }
}
exports.updateById = async (id, name, content) => {
  try {
    const testimonial = await Testimonial.findByPk(id)

    if (!testimonial) {
      throw Error('Not found')
    }

    testimonial.set({ id, name, content })
    testimonial.save()

    return testimonial
  } catch (error) {
    if (error.message === 'Not found') {
      throw new ErrorObject('No Testimonial found with that ID', 404)
    }
    throw new ErrorObject(error.message)
  }
}
