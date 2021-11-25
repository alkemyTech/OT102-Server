const { ErrorHandler } = require('../helpers/error')

const validateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new ErrorHandler(404, 'Missing required email and password fields')
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateUser,
}
