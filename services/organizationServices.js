const { Organization } = require('../models')

exports.getById = async (id) => {
  try {
    const organization = await Organization.findOne({ where: { id } })
    return organization
  } catch (e) {
    throw Error('Error while retrieving Organization')
  }
}
