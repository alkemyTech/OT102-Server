const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { addMember, getMembers } = require('../services/members')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allMembers = await getMembers()
      endpointResponse({
        res,
        message: 'Members were retrieved successfully.',
        body: allMembers,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error retrieving members] - [members - get]: ${error.message}`,
          500,
        ),
      )
    }
  }),

  post: catchAsync(async (req, res) => {
    try {
      const { name, image } = req.body
      const newMember = await addMember({ name, image })
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Member created successfully.',
        body: newMember,
      })
    } catch (error) {
      res.status(error.statusCode).json(error)
    }
  }),
}
