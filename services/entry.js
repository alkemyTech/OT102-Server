const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const db = require('../models/index')
const { Entry } = require('../models')

exports.getEntries = async () => {
  try {
    const entries = await Entry.findAll({
      where: { type: 'news' },
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    })
    return entries
  } catch (error) {
    throw Error(error.message)
  }
}

exports.getEntryById = async (id) => {
  try {
    const entryById = await Entry.findByPk(id)
    if (!entryById) {
      throw new ErrorObject('Member not found', 404)
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
      throw new ErrorObject('Member not found', 404)
    }
    deleteEntry.destroy()
    return deleteEntry
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateById = async (data) => {
  const {
    id, name, image, content, categoryId, type,
  } = data
  try {
    const updateEntry = await Entry.findByPk(id)
    if (!updateEntry) {
      const httpError = createHttpError(404, 'News not found.')
      throw httpError
    }
    updateEntry.set({
      id, name, image, content, categoryId, type,
    })
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
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject('Entry already exists', 409)
    } else if (error.name === 'SequelizeConnectionRefusedError') {
      throw new ErrorObject('Error connecting to database', 500)
    }
    throw new ErrorObject(error.message)
  }
}

exports.deleteEntryPermanently = async (id) => {
  try {
    return await db.sequelize.query('DELETE FROM entries WHERE id = :id', {
      replacements: { id },
      type: db.sequelize.QueryTypes.DELETE,
    })
  } catch (error) {
    throw Error(error.message)
  }
}
