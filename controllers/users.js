// const bcryptjs = require('bcryptjs')
const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
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
        msg: 'Users were retrieved successfully.',
        body: users,
      })
    } catch (error) {
      next(new ErrorObject(`[Error retrieving users] - [users - get]: ${error.message}`, 404))
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const userFormData = {
        ...req.body,
        // password: bcryptjs.hashSync(req.body.password, 10),
        roleId: 2,
      }
      const newUser = await addUser(userFormData)

      endpointResponse({
        res,
        message: 'User were created successfully.',
        body: newUser,
        status: 201,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error creating user] - [users - POST]: ${error.message}`,
          error.statusCode,
        ),
      )
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedUser = await deleteUser(req.params.id)
      endpointResponse({
        res,
        msg: 'User were deleted successfully.',
        body: deletedUser,
      })
    } catch (error) {
      next(new ErrorObject(`[Error deleting users] - [users - delete]: ${error.message}`, 404))
    }
  }),
}
