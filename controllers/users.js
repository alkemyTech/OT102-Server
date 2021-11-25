const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { getUsers } = require('../services/user')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const users = await getUsers()
      // if (true) {
      //   return next(new ErrorObject('No users were found with that ID', 404))
      // }
      res.status(200).json({
        status: true,
        msg: 'Users were retrieved successfully.',
        body: users,
      })
    } catch (error) {
      next(new ErrorObject(`[Error retrieving users] - [users - get]: ${error.message}`, 404))
    }
  }),
}
