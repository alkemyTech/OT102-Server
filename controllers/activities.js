const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const {
  getActivities,
  getById,
  deleteActivity,
  addActivity,
  updateActivity,
} = require('../services/activities')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const allActivities = await getActivities()
      endpointResponse({
        res,
        message: 'Activities were retrieved successfully.',
        body: allActivities,
      })
    } catch (error) {
      const httpError = createHttpError(500, `[Error retrieving activities] - [activities - get]: ${error.message}`)
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
      const httpError = createHttpError(500, `[Error retrieving activity by ID] - [activity - get]: ${error.message}`)
      next(httpError)
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const activityId = req.params.id
      const deletedActivity = await deleteActivity(activityId)
      endpointResponse({
        res,
        message: 'Activity were deleted successfully.',
        body: deletedActivity,
      })
    } catch (error) {
      const httpError = createHttpError(404, `[Error deleting activity] - [activity - delete]: ${error.message}`)
      next(httpError)
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const { name, image, content } = req.body
      const newsActivity = await addActivity({ name, image, content })
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Activity created successfully.',
        body: newsActivity,
      })
    } catch (error) {
      const httpError = createHttpError(409, `[Error creating activity] - [activity - post]: ${error.message}`)
      next(httpError)
    }
  }),
  update: catchAsync(async (req, res, next) => {
    try {
      const { name, image } = req.body
      const { id } = req.params
      const updatedActivity = await updateActivity({ id, name, image })
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'activity updated successfully',
        body: updatedActivity,
      })
    } catch (error) {
      const httpError = createHttpError(404, `[Error updating activity] - [activity - put]: ${error.message}`)
      next(httpError)
    }
  }),
}
