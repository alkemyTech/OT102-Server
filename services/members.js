const { ErrorObject } = require('../helpers/error')
const { Member } = require('../models')

exports.getMembers = async () => {
  try {
    return await Member.findAll()
  } catch (error) {
    throw Error(error.message)
  }
}

exports.deleteMember = async (id) => {
  try {
    const findMember = await Member.findOne({
      where: { id },
    })
    if (!findMember) {
      throw Error('Member already deleted/Invalid ID')
    } else {
      const deletedMember = await Member.destroy({ where: { id } })
      return deletedMember
    }
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
      )
    } else if (error.name === 'SequelizeConnectionRefusedError') {
      throw new ErrorObject('Error connecting database', 500)
    }
    throw new ErrorObject(error.message, 500)
  }
}

exports.updateMember = async (data) => {
  const { id, name, image } = data
  try {
    const member = await Member.findByPk(id)
    if (member === null) {
      throw Error('not found')
    }
    member.set({ name, image })
    member.save()
    return member
  } catch (error) {
    if (error.message === 'not found') {
      throw new ErrorObject('Member not found', 404)
    }
    throw new ErrorObject(error.message, 500)
  }
}
