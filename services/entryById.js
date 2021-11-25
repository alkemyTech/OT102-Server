const { Entry } = require('../models')

exports.getById = async (id) => {
  try {
    const entryById = await Entry.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    })
    return entryById
  } catch (error) {
    throw Error('Error while retrieving entry by ID')
  }
}
