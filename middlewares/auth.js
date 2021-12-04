const createHttpError = require('http-errors')
const { verifyToken } = require('./jwt')

const tokenId = (req) => {
  const token = req.headers.authorization
  if (!token) {
    throw new Error('No token provided!')
  }
  const decodedUser = verifyToken(token)
  if (!decodedUser) {
    throw new Error('Unauthorized! Please enter a valid token provided at login')
  }
  return decodedUser.id
}

const isLoggedUser = async (req, res, next) => {
  try {
    req.userId = tokenId(req)
    next()
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      error.message,
    )
    next(httpError)
  }
}

module.exports = { isLoggedUser }
