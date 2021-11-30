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
  } catch (error) {
    throw Error('Error while retrieving categories')
  }
}

exports.updateCategory = async (data) => {
  const { id, name, description } = data
  try {
    const category = await Category.findByPk(id)
    if (category === null) {
      throw Error('not found')
    }
    category.set({ id, name, description })
    category.save()
    return category
  } catch (error) {
    if (error.message === 'not found') {
      throw new ErrorObject('Category not found', 404)
    }
    throw new ErrorObject(error.message, 500)
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
      throw new ErrorObject('The category already exist', 409) // 409 conflict
    } else if (error.name === 'SequelizeConnectionRefusedError') {
      throw new ErrorObject('Error connecting database', 500)
    }
    throw new ErrorObject(error.message)
  }
}
