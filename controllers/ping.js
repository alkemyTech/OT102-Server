const { ErrorHandler } = require('../helpers/error')

module.exports = {
  pong: (req, res) => {
    try {
      const pongResponse = {
        status: true,
        message: 'PONG',
      }
      res.status(200).json(pongResponse)
    } catch (err) {
      throw new ErrorHandler(500, err.message)
    }
  },
}
