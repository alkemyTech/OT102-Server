const createHttpError = require('http-errors')

const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const {
  getAllSlides,
  getSlideById,
  deleteSlide,
  updateSlide,
  addSlide,
} = require('../services/slides')

module.exports = {
  get: async (req, res, next) => {
    try {
      const allSlides = await getAllSlides()
      const response = {
        status: true,
        message: 'Slides retrieved successfully',
        data: allSlides,
      }
      res.status(200).json(response)
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving slides] - [slides - GET]: ${error.message}`,
      )
      next(httpError)
    }
  },

  getById: async (req, res, next) => {
    try {
      const slide = await getSlideById(req.param.id)
      const response = {
        status: true,
        message: 'Slide retrieved successfully',
        data: slide,
      }
      res.status(200).json(response)
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving slide] - [slides - GET]: ${error.message}`,
      )
      next(httpError)
    }
  },

  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedSlide = await deleteSlide(req.params.id)
      endpointResponse({
        res,
        message: 'Slide was succesfully deleted',
        body: deletedSlide,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting slide] - [slide - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description } = req.body
      const newSlide = await addSlide({ name, description })
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Slide created successfully.',
        body: newSlide,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating slide] - [slide - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  update: catchAsync(async (req, res, next) => {
    const { name, description } = req.body
    const { id } = req.params
    try {
      const updatedSlide = await updateSlide({ id, name, description })
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Slide was succesfully updated',
        body: updatedSlide,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating slide] - [slide - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
