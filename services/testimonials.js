const { ErrorObject } = require('../helpers/error')
const { Testimonial } = require('../models')

exports.getAllTestimonials = async () => {
  try {
    return await Testimonial.findAll()
  } catch (error) {
    throw new ErrorObject(error.message, 500)
  }
}

exports.getById = async (id) => {
  try {
    const testimonialById = await Testimonial.findByPk(id)
    if (!testimonialById) {
      throw new ErrorObject(`No testimonial found with ID: ${id}`, 404)
    }
    return testimonialById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateById = async (id, name, image, content) => {
  try {
    const testimonial = await Testimonial.findByPk(id)

    if (!testimonial) {
      throw Error('Not found')
    }

    testimonial.set({
      id, name, image, content,
    })
    testimonial.save()

    return testimonial
  } catch (error) {
    if (error.message === 'Not found') {
      throw new ErrorObject('No Testimonial found with that ID', 404)
    }
    throw new ErrorObject(error.message)
  }
}

exports.deleteTestimonial = async (id) => {
  try {
    const testimonial = await Testimonial.findByPk(id)
    if (!testimonial) {
      throw Error('Testimonial already deleted')
    }
    return await Testimonial.destroy({ where: { id } })
  } catch (error) {
    throw new ErrorObject(error.message)
  }
}

exports.addTestimonial = async (data) => {
  try {
    const {
      id, name, image, content,
    } = await Testimonial.create(data)
    return {
      id,
      name,
      image,
      content,
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject('Testimonial already exists', 409)
    } else if (error.name === 'SequelizeConnectionRefusedError') {
      throw new ErrorObject('Error connecting to database', 500)
    }
    throw new ErrorObject(error.message)
  }
}
