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
