const { Entry } = require('../models')

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
