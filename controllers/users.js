const bcryptjs = require('bcrypt')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getUsers, addUser, deleteUser } = require('../services/user')

module.exports = {
  get: catchAsync(async (req, res) => {
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
      res.status(error.statusCode).json(error)
    }
  }),
  post: catchAsync(async (req, res) => {
    try {
      const userFormData = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
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
  destroy: catchAsync(async (req, res) => {
    try {
      const deletedUser = await deleteUser(req.params.id)
      endpointResponse({
        res,
        msg: 'User were deleted successfully.',
        body: deletedUser,
      })
    } catch (error) {
      res.status(error.statusCode).json(error)
    }
  }),
}
