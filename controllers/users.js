const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { getUsers, deleteUser } = require('../services/user')

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
  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedUser = await deleteUser(req.params.id)
      endpointResponse({
        res,
        msg: 'Users were retrieved successfully.',
        body: deletedUser,
      })
    } catch (error) {
      next(new ErrorObject(`[Error deleting users] - [users - delete]: ${error.message}`, 404))
    }
  }),
}
