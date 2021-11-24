const { getById } = require('../services/organizationServices')

module.exports = {
  getById: async (req, res, next) => {
    try {
      const organizations = await getById(req.params.id)
      const response = {
        status: true,
        msg: 'Organizations retrieved successfully',
        data: organizations,
      }
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  },
}