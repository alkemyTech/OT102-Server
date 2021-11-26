const { ErrorObject } = require('../helpers/error')
const { Category } = require('../models')

exports.getAll = async () => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    })
    return categories
  } catch (e) {
    throw Error('Error while retrieving categories')
  }
}

exports.addCategory = async (data) => {
  try {
    const { id, name, description } = await Category.create(data)
    return { id, name, description }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject('category already exist', 409) // 409 conflict
    }
    throw Error('Error while creating category')
  }
}
