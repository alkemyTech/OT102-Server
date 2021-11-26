const { Entry } = require('../models')

exports.updateById = async (id, updatedName, updatedContent) => {
  try {
    const testimonialById = await Entry.findOne({
      where: { id },
    })

    if (!testimonialById) {
      throw Error('No Testimonial found with that ID')
    } else {
      const updatedTestimonial = Entry.update(
        { name: updatedName, content: updatedContent },
        { where: { id } },
      )
      return updatedTestimonial
    }
  } catch (error) {
    throw Error(error.message)
  }
}
