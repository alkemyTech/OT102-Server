const { validationResult } = require('express-validator')

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

// Validate request
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const [error] = errors.array()
    next(
      new ErrorObject(
        `[Error creating ${req.baseUrl.slice(1)}] - [${req.baseUrl} - ${
          req.method
        }]: ${error.msg}`,
        400,
      ),
    )
  }
  return next()
}
const validateRequest = (schema) => [schema, validate]

module.exports = {
  validateUser,
  validateRequest,
}
