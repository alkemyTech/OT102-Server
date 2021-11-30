const createHttpError = require('http-errors')

const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { addMember, getMembers, updateMember } = require('../services/members')

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

  update: catchAsync(async (req, res, next) => {
    const { name, image } = req.body
    const { id } = req.params
    try {
      const updatedMember = await updateMember({ id, name, image })
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Member was succesfully updated',
        body: updatedMember,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),
}
