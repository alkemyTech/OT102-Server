const { ErrorObject } = require('../helpers/error')
const { Member } = require('../models')

exports.getMembers = async () => {
  try {
    return await Member.findAll()
  } catch (error) {
    throw Error(error.message)
  }
}

exports.addMember = async (data) => {
  try {
    const { id, name, image } = await Member.create(data)
    return { id, name, image }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorObject(
        '[Error creating member] [] - The member already exist',
        409, // status 409 Conflict
        error.errors,
      )
    }
    throw new ErrorObject(
      `[Error creating member] - [] - ${error.message}`,
      500,
      [error],
    )
  }
}
