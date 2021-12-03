const jwt = require('jsonwebtoken')
const config = require('../config/config').development

const generateToken = (user) => {
  const payload = { user }

  const token = jwt.sign(payload, config.secret, {
    expiresIn: '7h',
  })
  return token
}

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, config.secret)
  if (!decodedToken) {
    throw new Error('Invalid token')
  }
  return decodedToken
}

module.exports = { generateToken, verifyToken }
