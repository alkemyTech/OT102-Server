const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { getContacts } = require('../services/contacts')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const contacts = await getContacts()
      endpointResponse({
        res,
        msg: 'Contacts were retrieved successfully.',
        body: contacts,
      })
    } catch (error) {
      next(new ErrorObject(`[Error retrieving contacts] - [contacts - get]: ${error.message}`, 404))
    }
  }),
}
