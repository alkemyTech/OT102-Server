const createHttpError = require('http-errors')
const bcryptjs = require('bcrypt')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const {
  getUsers,
  getUserByEmail,
  addUser,
  deleteUser,
  getUserById,
  updateUser,
} = require('../services/user')
const { generateToken } = require('../middlewares/jwt')
const { getRoleByName } = require('../services/roles')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await getUsers()
      endpointResponse({
        res,
        message: 'Users were retrieved successfully.',
        body: users,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
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
      const { id: roleId } = await getRoleByName('Standard')
      userFormData.roleId = roleId
      const newUser = await addUser(userFormData)
      newUser.userRole = 'Standard'
      const token = generateToken(newUser)

      endpointResponse({
        res,
        message: 'User were created successfully.',
        body: { token, user: newUser },
        status: 201,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error creating users] - [users - post]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body
      const findUser = await getUserByEmail(email)
      if (!findUser) {
        throw new Error(400, 'Invalid credentials')
      } else {
        const decriptedPassword = bcryptjs.compareSync(password, findUser.password)
        if (decriptedPassword) {
          const user = await getUserById(findUser.id)
          const token = generateToken(user)
          endpointResponse({
            res,
            message: 'User logged succesfully',
            body: { token, user },
            status: 200,
          })
        } else {
          throw new Error(400, 'Invalid credentials')
        }
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
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
        error.statusCode || 500,
        `[Error deleting User] - [users - delete]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  getMyUser: catchAsync(async (req, res, next) => {
    try {
      const userData = await getUserById(req.userId)
      endpointResponse({
        res,
        message: 'User retrieved successfully.',
        body: userData,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error retrieving user] - [/auth/me - GET] ${error.message}`,
      )
      next(httpError)
    }
  }),

  updateUser: catchAsync(async (req, res, next) => {
    try {
      const updatedUser = await updateUser(req.userId, req.body)
      endpointResponse({
        res,
        message: 'User were updated successfully.',
        body: updatedUser,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode || 500,
        `[Error updating User] - [users - UPDATE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
