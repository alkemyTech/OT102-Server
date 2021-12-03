const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const {
  getAllActivities,
  getById,
  deleteActivity,
  addActivity,
} = require('../services/activities')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allActivities = await getAllActivities()
      endpointResponse({
        res,
        message: 'Activities were retrieved successfully.',
        body: allActivities,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving activities] - [activities - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  getActivity: catchAsync(async (req, res, next) => {
    try {
      const activity = await getById(req.params.id)
      endpointResponse({
        res,
        message: 'Activity retrieved successfully.',
        body: activity,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving activity] - [activities - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  destroy: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      const deletedActivity = await deleteActivity(id)
      endpointResponse({
        res,
        message: 'Activity were deleted successfully.',
        body: deletedActivity,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting activity] - [activities - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  post: catchAsync(async (req, res, next) => {
    try {
      const { name, image, content } = req.body
      const activity = await addActivity({ name, image, content })
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Activity created successfully.',
        body: activity,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating activity] - [activities - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
