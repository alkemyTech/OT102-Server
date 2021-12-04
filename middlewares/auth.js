const createHttpError = require('http-errors')
const { verifyToken } = require('./jwt')

const tokenId = (req) => {
  const token = req.headers.authorization
  if (!token) {
    const error = new Error('No token provided!')
    error.status = 401
    throw error
  }
  const decodedUser = verifyToken(token)
  if (!decodedUser) {
    const error = new Error('Unauthorized! Please enter a valid token provided at login')
    error.status = 403
    throw error
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
