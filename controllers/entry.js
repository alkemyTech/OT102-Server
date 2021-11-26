const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { getEntries } = require('../services/entry')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allEntries = await getEntries({ attributes: ['name'] })
      endpointResponse({
        res,
        msg: 'Entries were retrieved successfully.',
        body: allEntries,
      })
    } catch (error) {
      next(new ErrorObject(`[Error retrieving entries] - [entries - get]: ${error.message}`, 404))
    }
  }),
}
