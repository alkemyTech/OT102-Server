const { ErrorObject } = require('../helpers/error')
const { Entry } = require('../models')

exports.updateById = async (id, name, content) => {
  try {
    const testimonial = await Entry.findByPk(id)

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
