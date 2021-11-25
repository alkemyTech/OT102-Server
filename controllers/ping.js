const { ErrorObject } = require('../helpers/error')

module.exports = {
  pong: (req, res, next) => {
    try {
      const pongResponse = {
        status: true,
        message: 'PONG',
      }
      res.status(200).json(pongResponse)
    } catch (error) {
      next(new ErrorObject(`[Error making PING] - [ping - pong]: ${error.message}`, 500))
    }
  },
}
