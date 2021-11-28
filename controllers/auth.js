const bcryptjs = require('bcrypt')
const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { addUser } = require('../services/auth')

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const userFormData = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
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
}
