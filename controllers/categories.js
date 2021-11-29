const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const {
  getAll,
  deleteCategory,
  updateCategory,
} = require('../services/categories')

module.exports = {
  get: async (req, res, next) => {
    try {
      const categories = await getAll()
      const response = {
        status: true,
        message: 'Categories retrieved successfully',
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
      next(error)
    }
  }),
}
