const createHttpError = require('http-errors')
const { getById, getEntries, deleteEntry } = require('../services/entry')
const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { catchAsync } = require('../helpers/index')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allEntries = await getEntries(req.params.type)
      endpointResponse({
        res,
        message: 'Entries were retrieved successfully.',
        body: allEntries,
      })
    } catch (error) {
      const httpError = createHttpError(500, `[Error retrieving entries] - [entries - get]: ${error.message}`)
      next(httpError)
    }
  }),
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
  destroy: catchAsync(async (req, res, next) => {
    try {
      const entryId = req.params.id
      const deletedEntry = await deleteEntry(entryId)
      endpointResponse({
        res,
        message: 'Entry were deleted successfully.',
        body: deletedEntry,
      })
    } catch (error) {
      const httpError = createHttpError(404, `[Error deleting entry] - [entry - delete]: ${error.message}`)
      next(httpError)
    }
  }),
}
