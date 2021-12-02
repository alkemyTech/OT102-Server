const createHttpError = require('http-errors')
const bcryptjs = require('bcrypt')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const {
  getUsers, getUserByEmail, addUser, deleteUser,
} = require('../services/user')
const { generateToken } = require('../middlewares/jwt')

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
      const httpError = createHttpError(
        500,
        `[Error retrieving users] - [users - get]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  createUser: catchAsync(async (req, res, next) => {
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
      const httpError = createHttpError(
        500,
        `[Error creating users] - [users - post]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await getUserByEmail(email)
      const token = generateToken(user)
      if (!user) {
        throw new Error(400, 'Invalid credentials')
      } else {
        const decriptedPassword = bcryptjs.compareSync(password, user.password)
        if (decriptedPassword) {
          endpointResponse({
            res,
            message: 'User logged succesfully',
            body: { token, user },
            status: 201,
          })
        } else {
          throw new Error(400, 'Invalid credentials')
        }
      }
    } catch (error) {
      const httpError = createHttpError(
        error.status,
        `[Error logging users] - [users - post]: ${error.message}`,
      )
      next(httpError)
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
      const httpError = createHttpError(
        404,
        `[Error deleting User] - [users - delete]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
