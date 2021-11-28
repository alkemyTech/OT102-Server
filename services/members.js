const { Member } = require('../models')
const { ErrorObject } = require('../helpers/error')

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
      throw new ErrorObject(
        `ID ${id} doesn't exist or has been deleted.`,
      )
    } else {
      const deleteMember = await Member.destroy({ where: { id } })
      return deleteMember
    }
  } catch (error) {
    throw new ErrorObject(
      '[Error deleting members] - []',
      500,
      [error],
    )
  }
}
