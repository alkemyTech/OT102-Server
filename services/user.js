const { User } = require('../models')

exports.getUsers = async () => {
  try {
    const users = await User.findAll()
    return users
  } catch (e) {
    throw Error('Error while retrieving Users')
  }
}
