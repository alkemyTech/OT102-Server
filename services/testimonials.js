const { ErrorObject } = require('../helpers/error')
const { Entry } = require('../models')

exports.updateById = async (id, updatedName, updatedContent) => {
  let updatedTestimonial = {}
  try {
    const testimonialById = await Entry.findOne({
      where: { id },
    })

    if (!testimonialById) {
      throw Error('Not found')
    }

    await Entry.update(
      { name: updatedName, content: updatedContent },
      { where: { id } },
    )

    // Requirements are to return the updated entry's data upon success:
    updatedTestimonial = await Entry.findOne({ where: { id } })

    return updatedTestimonial
  } catch (error) {
    if (error.message === 'Not found') {
      throw new ErrorObject('No Testimonial found with that ID', 404)
    }
    throw new ErrorObject(error.message)
  }
}
