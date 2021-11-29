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
    throw Error(err.message)
  }
}

exports.getById = async (id) => {
  try {
    const entryById = await Entry.findOne({
      where: { id },
    })

    return entryById
  } catch (error) {
    throw Error('Error while retrieving entry by ID')
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
    throw Error(err.message)
  }
}
