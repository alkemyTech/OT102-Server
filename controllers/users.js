const createHttpError = require('http-errors')
const bcryptjs = require('bcrypt')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getUsers, addUser, deleteUser } = require('../services/user')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await getUsers()
      // if (true) {
      //   return next(new ErrorObject('No users were found with that ID', 404))
      // }
      endpointResponse({
        res,
        message: 'Users were retrieved successfully.',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(500, `[Error retrieving users] - [users - get]: ${error.message}`)
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res) => {
    try {
      const { password } = req.body
      const encryptedPassword = bcryptjs.hashSync(password, 10)
      const userFormData = {
        ...req.body,
        password: encryptedPassword,
      }
      const newUser = await addUser(userFormData)

      endpointResponse({
        res,
        message: 'User were created successfully.',
        body: newUser,
        status: 201,
      })
    } catch (error) {
      res.status(error.statusCode).json(error)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedUser = await deleteUser(req.params.id)
      endpointResponse({
        res,
        message: 'User were deleted successfully.',
        body: deletedUser,
      })
    } catch (error) {
      const httpError = createHttpError(404, `[Error deleting User] - [users - delete]: ${error.message}`)
      next(httpError)
    }
  }),
}
