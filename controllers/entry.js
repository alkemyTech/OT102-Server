const createHttpError = require('http-errors')
const {
  getEntryById,
  getEntries,
  deleteEntry,
  updateById,
  addEntry,
} = require('../services/entry')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/index')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allEntries = await getEntries(req.params.type)
      endpointResponse({
        res,
        code: 200,
        message: 'Entries were retrieved successfully.',
        body: allEntries,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  getEntry: catchAsync(async (req, res, next) => {
    try {
      const entry = await getEntryById(req.params.id)
      endpointResponse({
        res,
        message: 'Entry retrieved successfully!',
        body: entry,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving entry] - [entry - GET]: ${error.message}`,
      )
      next(httpError)
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
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  updatedEntry: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params

      const {
        name, image, content, type, categoryId,
      } = req.body

      const updatedEntry = await updateById({
        id,
        name,
        image,
        content,
        type,
        categoryId,
      })
      endpointResponse({
        res,
        code: 200,
        message: 'Entry updated successfully.',
        body: updatedEntry,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const {
        name,
        content,
        image,
        categoryId, // TODO must check if is valid category id
      } = req.body
      const entry = await addEntry({
        name,
        image,
        content,
        type: 'news',
        categoryId,
      })
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Entry created successfully.',
        body: entry,
      })
    } catch (error) {
      const httpError = createHttpError(error.statusCode, error.message)
      next(httpError)
    }
  }),
}
