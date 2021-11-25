const { User } = require('../models')

exports.getUsers = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (err) {
    throw Error(err.message)
  }
}
