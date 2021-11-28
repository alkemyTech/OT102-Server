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
      atributtes: { include: ['email'] },
    })
    return user
  } catch (err) {
    throw Error(err.message)
  }
}

exports.addUser = async (data) => {
  try {
    const userCreate = await User.create(data)
    return userCreate
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
