const { User } = require('../models')

exports.getUsers = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (err) {
    throw Error(err.message)
  }
}

exports.deleteUser = async (id) => {
  try {
    const deleteUser = await User.destroy({ where: { id } })
    return deleteUser
  } catch (err) {
    throw Error(err.message)
  }
}
