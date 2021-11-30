const createHttpError = require('http-errors')

const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { addMember, getMembers, deleteMember } = require('../services/members')

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
      next(new ErrorObject(`[Error retrieving members] - [members - get]: ${error.message}`, 500))
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const deletedMember = await deleteMember(req.params.id)
      endpointResponse({
        res,
        message: 'Member succesfully deleted',
        body: deletedMember,
      })
    } catch (error) {
      const httpError = createHttpError(
        500,
        `[Error deleting members] - [members - delete]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
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
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),
}
