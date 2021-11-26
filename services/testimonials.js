const { Entry } = require('../models')

exports.updateById = async (id, updatedName, updatedContent) => {
  try {
    const testimonialById = await Entry.findOne({
      where: { id },
    })

    if (!testimonialById) {
      throw Error('No Testimonial found with that ID')
    } else {
      const updateTestimonial = await Entry.update(
        { name: updatedName, content: updatedContent },
        { where: { id } },
      )
      // Requirements are to return the updated entry's data upon success:
      if (updateTestimonial) {
        const updatedTestimonial = await Entry.findOne({ where: { id } })
        return updatedTestimonial
      }
      throw Error('Error updating entry')
    }
  } catch (error) {
    throw Error(error.message)
  }
}
