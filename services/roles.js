const { ErrorObject } = require('../helpers/error')
const { Role } = require('../models')

exports.getRoleByName = async (roleName) => {
  try {
    const role = await Role.findOne({ where: { name: roleName } })
    if (!role) throw new ErrorObject('Role not Found', 404)
    return role
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getRoles = async () => {
  try {
    return await Role.findAll()
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
