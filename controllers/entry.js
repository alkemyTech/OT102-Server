const { getById } = require('../services/entryById')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/index')

module.exports = {
  getEntry: catchAsync(async (req, res, next) => {
    try {
      const entry = await getById(req.params.id)
      endpointResponse({
        res,
        message: 'Entry retrieved succesfully!',
        body: entry,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error retrieving entry by ID] - [organization - get]: ${error.message}`,
          404,
        ),
      )
    }
  }),
}
