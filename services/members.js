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
      throw Error(`ID ${id} already deleted.`)
    } else {
      const deleteMember = await Member.destroy({ where: { id } })
      return deleteMember
    }
  } catch (error) {
    throw Error(error.message)
  }
}
