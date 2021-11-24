const Category = require('../models')

exports.getAll = async () => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'description', 'id'],
      },
    })
    return categories
  } catch (e) {
    throw Error('Error while retrieving categories')
  }
}
