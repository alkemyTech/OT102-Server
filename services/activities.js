const { ErrorObject } = require('../helpers/error')
const { Activity } = require('../models')

exports.getActivities = async () => {
  try {
    const activities = await Activity.findAll({
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    })
    return activities
  } catch (err) {
    throw Error(err.message)
  }
}

exports.getById = async (id) => {
  try {
    const activityById = await Activity.findOne({
      where: { id },
    })

    if (!activityById) {
      throw Error('Not found')
    }

    return activityById
  } catch (error) {
    if (error.message === 'Not found') {
      throw Error('No activity found with that ID', 404)
    }
    throw Error('Error while retrieving activity by ID')
  }
}

exports.deleteActivity = async (id) => {
  try {
    const activity = await Activity.findOne({
      where: { id },
    })
    if (!activity) {
      throw Error(`ID ${id} not exist.`)
    } else {
      const deleteActivity = await Activity.destroy({ where: { id } })
      return deleteActivity
    }
  } catch (err) {
    throw Error(err.message)
  }
}

exports.addActivity = async (data) => {
  try {
    const {
      id, name, image, content,
    } = await Activity.create(data)
    return {
      id, name, image, content,
    }
  } catch (err) {
    throw Error(err.message)
  }
}
exports.updateActivity = async (id, name, image, content) => {
  try {
    const activity = await Activity.findByPk(id)

    if (!activity) {
      throw Error(`ID ${id} not found.`)
    }
    activity.set({
      id, name, image, content,
    })
    activity.save()

    return activity
  } catch (error) {
    if (error.message === 'ID not found.') {
      throw new ErrorObject('activity not found with that ID', 404)
    }
    throw new ErrorObject(error.message, 500)
  }
}
