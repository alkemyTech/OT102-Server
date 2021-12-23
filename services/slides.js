const { ErrorObject } = require('../helpers/error')
const { Slide } = require('../models')

exports.getAllSlides = async () => {
  try {
    const slides = await Slide.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    })
    return slides
  } catch (error) {
    throw ErrorObject(error.message, 500)
  }
}

exports.getSlideById = async (id) => {
  try {
    const slide = await Slide.findByPk(id)
    if (slide === null) {
      throw new ErrorObject('Slide not found', 404)
    }
    return slide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateSlide = async (id, data) => {
  const { imageUrl, text, order } = data
  try {
    const slide = await Slide.findByPk(id)
    if (slide === null) {
      throw new ErrorObject('Slide not found', 404)
    }
    slide.set({ imageUrl, text, order })
    slide.save()
    return slide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteSlide = async (id) => {
  try {
    const slide = await Slide.findByPk(id)
    if (slide === null) {
      throw new ErrorObject('Slide not found', 404)
    }
    slide.destroy().save()
    return slide
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.addSlide = async (data) => {
  try {
    const { id, name, description } = await Slide.create(data)
    return { id, name, description }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject('The Slide already exist', 409) // 409 conflict
    } else if (error.name === 'SequelizeConnectionRefusedError') {
      throw new ErrorObject('Error connecting database', 500)
    }
    throw new ErrorObject(error.message)
  }
}
