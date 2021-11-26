const { Entry } = require('../models')

exports.getById = async (id) => {
  try {
    const entryById = await Entry.findOne({
      where: { id },
    })
    // If there aren't any Entries with that ID throw an error message.
    if (!entryById) {
      throw Error('No entry found with that ID')
    }
    return entryById
  } catch (error) {
    throw Error('Error while retrieving entry by ID')
  }
}
