const createHttpError = require('http-errors')

const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const {
  getAll,
  getById,
  deleteCategory,
  updateCategory,
  addCategory,
} = require('../services/categories')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allCategories = await getAll()
      endpointResponse({
        res,
        message: 'Categories were retrieved successfully',
        body: allCategories,
      })
    } catch (error) {
      const httpError = createHttpError(500, `[Error retrieving categories] - [categories - get]: ${error.message}`)
      next(httpError)
    }
  }),
  getCategory: catchAsync(async (req, res, next) => {
    try {
      const category = await getById(req.params.id)
      endpointResponse({
        res,
        message: 'Category retrieved successfully.',
        body: category,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [category - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedCategory = await deleteCategory(req.params.id)
      endpointResponse({
        res,
        message: 'Category was succesfully deleted',
        body: deletedCategory,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error deleting Category] - [category - delete]: ${error.message}`,
          500,
        ),
      )
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description } = req.body
      const newCategory = await addCategory({ name, description })

      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Category created successfully.',
        body: newCategory,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  update: catchAsync(async (req, res, next) => {
    const { name, description } = req.body
    const { id } = req.params
    try {
      const updatedCategory = await updateCategory({ id, name, description })
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Category was succesfully updated',
        body: updatedCategory,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),
}
