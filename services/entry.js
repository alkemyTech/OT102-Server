const createHttpError = require('http-errors')
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
  } catch (err) {
    const httpError = createHttpError(
      400,
      `Error while getting entries: ${err.message}`,
    )
    throw httpError
  }
}

exports.getById = async (id) => {
  try {
    const entryById = await Entry.findOne({
      where: { id },
    })

    return entryById
  } catch (error) {
    const httpError = createHttpError(
      400,
      `Error while getting entry: ${error.message}`,
    )
    throw httpError
  }
}

exports.deleteEntry = async (id) => {
  try {
    const deleteEntry = await Entry.destroy({ where: { id } })
    if (!deleteEntry) {
      throw new Error('Entry not found.')
    }
    return deleteEntry
  } catch (err) {
    const httpError = createHttpError(
      400,
      `Error while deleting entry: ${err.message}`,
    )
    throw httpError
  }
}

exports.updateById = async (id, entry) => {
  try {
    const filter = {
      where: { id },
    }
    const updateEntry = await Entry.update(entry, filter)
    if (!updateEntry) {
      const httpError = createHttpError(404, 'News not found.')
      throw httpError
    }
    return updateEntry
  } catch (err) {
    const httpError = createHttpError(
      400,
      `Error while updating entry: ${err.message}`,
    )
    throw httpError
  }
}
