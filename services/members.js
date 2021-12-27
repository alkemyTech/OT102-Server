const { ErrorObject } = require('../helpers/error')
const db = require('../models/index')
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
    const member = await Member.findByPk(id)
    if (!member) {
      throw new ErrorObject('Member not found', 404)
    }
    member.destroy()
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
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

exports.getMemberById = async (id) => {
  try {
    const member = await Member.findByPk(id)
    if (!member) {
      throw new ErrorObject('Member not found', 404)
    }
    return member
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteMemberPermanently = async (id) => {
  try {
    return await db.sequelize.query('DELETE FROM members WHERE id = :id', {
      replacements: { id },
      type: db.sequelize.QueryTypes.DELETE,
    })
  } catch (error) {
    throw Error(error.message)
  }
}
