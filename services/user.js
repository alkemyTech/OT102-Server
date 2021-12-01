const { User } = require('../models')

exports.getUsers = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (err) {
    throw Error(err.message)
  }
}

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
    })
    return user
  } catch (err) {
    throw Error(err.message)
  }
}

exports.addUser = async (data) => {
  try {
    const createdUser = await User.create(data)
    return createdUser
  } catch (err) {
    throw Error(err.message)
  }
}

exports.deleteUser = async (id) => {
  try {
    const deleteUser = await User.destroy({ where: { id } })
    if (!deleteUser) {
      throw new Error('User not found.')
    }
    return deleteUser
  } catch (err) {
    throw Error(err.message)
  }
}
