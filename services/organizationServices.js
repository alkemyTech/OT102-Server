const { ErrorObject } = require('../helpers/error')
const { Organization } = require('../models')

exports.getById = async (id) => {
  try {
    const organization = await Organization.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    })
    return organization
  } catch (e) {
    throw new Error('Error while retrieving Organization')
  }
}

exports.updateOrganization = async (id, data) => {
  try {
    const organization = await Organization.findByPk(id)
    if (!organization) throw new ErrorObject('Organization not found', 404)

    organization.update(data)
    return await organization.save()
  } catch (error) {
    throw new ErrorObject(
      error.message || 'Error while updating Organization',
      error.statusCode || 500,
    )
  }
}
