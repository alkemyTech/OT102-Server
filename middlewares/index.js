const { ErrorObject } = require('../helpers/error')

const validateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new ErrorObject('Missing required email and password fields', 404)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateUser,
}
