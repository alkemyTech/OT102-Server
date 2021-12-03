const jwt = require('jsonwebtoken')
const config = require('../config/config').development

const generateToken = (user) => {
  const payload = { user }

  const token = jwt.sign(payload, config.secret, {
    expiresIn: '7d',
  })
  return token
}

module.exports = {
  generateToken,
}
