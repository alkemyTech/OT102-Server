const { catchAsync } = require('../helpers')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { getContacts, addContact } = require('../services/contacts')

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
      next(
        new ErrorObject(
          `[Error retrieving contacts] - [contacts - get]: ${error.message}`,
          404,
        ),
      )
    }
  }),
  addContact: catchAsync(async (req, res, next) => {
    try {
      const {
        name, email, phone, message = '',
      } = req.body
      const contact = await addContact({
        name, email, phone, message,
      })
      endpointResponse({
        res,
        msg: 'Contact was added successfully.',
        body: contact,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error adding contact] - [contacts - add]: ${error.message}`,
          404,
        ),
      )
    }
  }),
}
