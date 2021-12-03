const { ErrorObject } = require('../helpers/error')
const { Activity } = require('../models')

exports.getAllActivities = async () => {
  try {
    return await Activity.findAll()
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getById = async (id) => {
  try {
    const activityById = await Activity.findByPk(id)
    if (!activityById) {
      throw new ErrorObject(`No activity found with ID: ${id}`, 404)
    }
    return activityById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteActivity = async (id) => {
  try {
    const activity = await Activity.findByPk(id)
    if (!activity) {
      throw new ErrorObject(`No activity found with ID: ${id}`, 404)
    }
    activity.destroy()
    return activity
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.addActivity = async (data) => {
  try {
    return await Activity.create(data)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject('The activity already exist', 409) // 409 conflict
    }
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
