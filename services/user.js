const { ErrorObject } = require('../helpers/error')
const { Role, User, sequelize } = require('../models')

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

exports.getUserById = async (id) => {
  try {
    const attributes = [
      ['id', 'userId'], // alias  id AS userId
      'firstName',
      'lastName',
      'email',
      'password',
      'image',
      [sequelize.col('role.name'), 'userRole'], // select 'role'.'name' from the JOIN
    ]
    const user = await User.findByPk(id, {
      attributes,
      include: {
        // includes other table
        model: Role, // model name
        as: 'role', // model alias
        attributes: [], // we don't want any atributes from Role
      },
    })
    if (!user) throw new ErrorObject('User not Found', 404)
    return user
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.addUser = async (userData) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      image,
      createdAt,
    } = await User.create(userData)
    return {
      userId:
      id,
      firstName,
      lastName,
      email,
      image,
      createdAt,
    }
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
