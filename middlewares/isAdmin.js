// midleware to check if the user.roleId user is admin
const jwt = require('jsonwebtoken')
const createHttpError = require('http-errors')
const config = require('../config/config').development

const isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    const httpError = createHttpError(401, 'No token provided')
    next(httpError)
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      const httpError = createHttpError(401, 'Failed to authenticate token')
      next(httpError)
    }
    if (decoded.role === 'Admin') {
      next()
    } else {
      const httpError = createHttpError(401, 'Forbidden access')
      next(httpError)
    }
    return null
  })
  return null
}
module.exports = isAdmin
