const { User } = require('../models')

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
