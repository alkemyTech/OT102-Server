const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { getMembers, deleteMember } = require('../services/members')

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
        msg: 'Member were deleted successfully.',
        body: deletedMember,
      })
    } catch (error) {
      next(new ErrorObject(`[Error deleting Member] - [members - delete]: ${error.message}`, 500))
    }
  }),
}
