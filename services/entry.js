const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { Entry } = require('../models')

exports.getEntries = async () => {
  try {
    const entries = await Entry.findAll({
      where: { type: 'News' },
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    })
    return entries
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getById = async (id) => {
  try {
    const entryById = await Entry.findOne({
      where: { id },
    })
    if (!entryById) {
      throw new ErrorObject(`No entry found with ID: ${id}`, 404)
    }
    return entryById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteEntry = async (id) => {
  try {
    const deleteEntry = await Entry.findByPk(id)
    if (!deleteEntry) {
      throw new ErrorObject(`No entry found with ID: ${id}`, 404)
    }
    deleteEntry.destroy()
    return deleteEntry
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateById = async (id, entry) => {
  try {
    const updateEntry = await Entry.findByPk(id)
    if (!updateEntry) {
      const httpError = createHttpError(404, 'News not found.')
      throw httpError
    }
    updateEntry.set(entry)
    await updateEntry.save()

    return updateEntry
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.addEntry = async (data) => {
  try {
    return await Entry.create(data)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
