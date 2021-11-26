const { getById } = require('../services/organizationServices')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/index')

module.exports = {
  getById: catchAsync(async (req, res, next) => {
    try {
      const organization = await getById(req.params.id)
       if (!organization) {
        return next(new ErrorObject('No organization were found with that ID', 404))
      } 
      endpointResponse({
        res,
        message: 'Organization retrieved successfully.',
        body: {
          name: organization.name,
          image: organization.image,
          phone: organization.phone, 
          address: organization.adress,
          welcomeText: organization.welcomeText
        },
      })
    } catch (error) {
      next(new ErrorObject(`[Error retrieving organization] - [organization - get]: ${error.message}`, 404))
    }
  }),
}
