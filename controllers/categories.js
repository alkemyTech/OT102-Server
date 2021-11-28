const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const {
  getAll,
  deleteCategory,
  addCategory,
} = require('../services/categories')

module.exports = {
  get: async (req, res, next) => {
    try {
      const categories = await getAll()
      const response = {
        status: true,
        msg: 'Categories retrieved successfully',
        data: categories,
      }
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  },

  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedCategory = await deleteCategory(req.params.id)
      endpointResponse({
        res,
        msg: 'Category was succesfully deleted',
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

  post: catchAsync(async (req, res) => {
    try {
      const { name, description } = req.body
      const newCategory = await addCategory({ name, description })

      endpointResponse({
        res,
        message: 'Category created successfully.',
        body: newCategory,
        status: 201,
      })
    } catch (error) {
      res.status(error.statusCode).json(error)
    }
  }),
}
