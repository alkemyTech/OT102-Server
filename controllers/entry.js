const { getById, getEntries, deleteEntry } = require('../services/entry')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
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
      next(
        new ErrorObject(
          `[Error retrieving entries] - [entries - get]: ${error.message}`,
          404,
        ),
      )
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
        msg: 'Entry were deleted successfully.',
        body: deletedEntry,
      })
    } catch (error) {
      next(new ErrorObject(`[Error deleting Entry] - [Entry - delete]: ${error.message}`, 500))
    }
  }),
}
