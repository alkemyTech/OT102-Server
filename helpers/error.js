class ErrorObject extends Error {
  constructor(message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err
  const status = statusCode || 500
  res.status(status).json({
    status: false,
    statusCode,
    message,
  })
}

module.exports = {
  ErrorObject,
  handleError,
}
