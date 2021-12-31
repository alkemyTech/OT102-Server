const createHttpError = require('http-errors')
const { Role, User, sequelize } = require('../models')

exports.getUsers = async () => {
  try {
    const attributes = [
      ['id', 'userId'], // alias  id AS userId
      'firstName',
      'lastName',
      'email',
      // 'password',
      'image',
      [sequelize.col('role.name'), 'userRole'], // select 'role'.'name' from the JOIN
    ]
    const users = await User.findAll({
      attributes,
      include: {
        // includes other table
        model: Role, // model name
        as: 'role', // model alias
        attributes: [], // we don't want any atributes
      },
    })
    return users
  } catch (err) {
    throw createHttpError(err.statusCode || 500, err.message)
  }
}

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
    })
    return user
  } catch (err) {
    throw createHttpError(err.statusCode || 500, err.message)
  }
}

exports.getUserById = async (id) => {
  try {
    const attributes = [
      ['id', 'userId'], // alias  id AS userId
      'firstName',
      'lastName',
      'email',
      'roleId',
      // 'password',
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
    if (!user) throw createHttpError(404, 'User not found.')
    return user
  } catch (err) {
    throw createHttpError(err.statusCode || 500, err.message)
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
    throw createHttpError(err.statusCode || 500, err.message)
  }
}

exports.deleteUser = async (id) => {
  try {
    const deleteUser = await User.destroy({ where: { id } })
    if (!deleteUser) {
      throw createHttpError(404, 'User not found.')
    }
    return deleteUser
  } catch (err) {
    throw createHttpError(err.statusCode || 500, err.message)
  }
}

exports.updateUser = async (id, data) => {
  try {
    const updateUser = await User.update(data, { where: { id } })
    if (!updateUser) {
      throw createHttpError(404, 'User not found.')
    }
    return updateUser
  } catch (err) {
    throw createHttpError(err.statusCode || 500, err.message)
  }
}
