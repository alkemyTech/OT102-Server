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
