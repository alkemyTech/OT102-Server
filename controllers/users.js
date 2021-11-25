const { getUsers } = require('../services/user')

module.exports = {
  get: async (req, res, next) => {
    try {
      const users = await getUsers()
      const response = {
        status: true,
        msg: 'Users retrieved successfully',
        data: users,
      }
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  },
}
