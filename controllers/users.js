const { getUsers } = require('../services/user')

module.exports = {
  get: async (req, res, next) => {
    try {
      const users = await getUsers()
      res.status(200).json({
        status: true,
        msg: 'Users were retrieved successfully.',
        users,
      })
    } catch (error) {
      next(error)
    }
  },
}
