const { Category } = require('../models')
const { ErrorObject } = require('../helpers/error')

exports.getAll = async () => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    })
    return categories
  } catch (error) {
    throw Error('Error while retrieving categories')
  }
}

exports.deleteCategory = async (id) => {
  try {
    // Check if category exists per ticket requirement:
    const categoryById = await Category.findOne({
      where: { id },
    })
    if (!categoryById) {
      // If category does not exist throw an error.
      throw Error('No category was found with that ID')
    } else {
      // If category exists then delete it.
      const deleteCategory = await Category.destroy({ where: { id } })
      return deleteCategory
    }
  } catch (error) {
    throw Error(error.message)
  }
}

exports.addCategory = async (data) => {
  try {
    const { id, name, description } = await Category.create(data)
    return { id, name, description }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject(
        '[Error creating Category] [] - The category already exist',
        409, // status 409 Conflict
        error.errors,
      )
    }
    throw new ErrorObject(
      `[Error creating category] - [] - ${error.message}`,
      500,
      [error],
    )
  }
}
