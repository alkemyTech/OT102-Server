const { Entry } = require('../models')

exports.getEntries = async () => {
  try {
    const entries = await Entry.findAll({
      attributes: {
        exclude: ['updatedAt', 'deletedAt'],
      },
    })
    return entries
  } catch (err) {
    throw Error(err.message)
  }
}
