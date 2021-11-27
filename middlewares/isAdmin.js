// midleware to check if the user.roleId user is admin
const jwt = require('jsonwebtoken')
const config = require('../config/config').development
const ErrorObject = require('../helpers/error')

const isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    next(new ErrorObject('No token provided.', 401))
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      next(new ErrorObject('Failed to authenticate token.', 401))
    }
    if (decoded.role === 'Admin') {
      next()
    } else {
      next(new ErrorObject('You are not an admin', 403))
    }
    return null
  })
  return null
}
module.exports = isAdmin
