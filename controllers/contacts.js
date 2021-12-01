const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getContacts } = require('../services/contacts')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const contacts = await getContacts()
      endpointResponse({
        res,
        message: 'Contacts were retrieved successfully.',
        body: contacts,
      })
    } catch (error) {
      const httpError = createHttpError(500, `[Error retrieving contacts] - [contacts - get]: ${error.message}`)
      next(httpError)
    }
  }),
}
