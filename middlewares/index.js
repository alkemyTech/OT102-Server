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
    res
      .status(400)
      .json(
        new ErrorObject(
          `[Error validating ${req.baseUrl.slice(1)}] - [${req.baseUrl} - ${
            req.method
          }]`,
          400,
          errors.array(),
        ),
      )
  }
  next()
}
const validateRequest = (schema) => [schema, validate]

module.exports = {
  validateRequest,
  validateUser,
}
