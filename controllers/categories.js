const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')

const { getAll, addCategory } = require('../services/categories')

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

  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description } = req.body
      const newCategory = await addCategory({ name, description })

      endpointResponse({
        res,
        message: 'Category were created successfully.',
        body: newCategory,
        status: 201,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error creating category] - [categories - POST]: ${error.message}`,
          error.statusCode,
        ),
      )
    }
  }),
}
