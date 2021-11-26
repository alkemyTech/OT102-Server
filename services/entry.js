const { Entry } = require('../models')

exports.getEntries = async () => {
  try {
    const entries = await Entry.findAll({
      attributes: {
        exclude: ['id', 'content', 'categoryId', 'type', 'updatedAt', 'deletedAt'],
      },
    })
    return entries
  } catch (err) {
    throw Error(err.message)
  }
}
