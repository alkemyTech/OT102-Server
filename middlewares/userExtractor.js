const jwt = require('jsonwebtoken')

const userExtractor = (req, res, next) => {
  const token = req.get('x-access-token')
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

  if (!token || !decodedToken.user) {
    return res.status(401).send({ error: 'token missing or invalid' })
  }

  const { user } = decodedToken
  req.userId = user.userId

  return next()
}

module.exports = userExtractor
