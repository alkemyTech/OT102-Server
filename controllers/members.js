const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getMembers, deleteMember } = require('../services/members')

module.exports = {
  get: catchAsync(async (req, res) => {
    try {
      const allMembers = await getMembers()
      endpointResponse({
        res,
        message: 'Members were retrieved successfully.',
        body: allMembers,
      })
    } catch (error) {
      res.status(error.statusCode).json(error)
    }
  }),
  destroy: catchAsync(async (req, res) => {
    try {
      const deletedMember = await deleteMember(req.params.id)
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Member were deleted successfully.',
        body: deletedMember,
      })
    } catch (error) {
      res.status(error.statusCode).json(error)
    }
  }),
}
