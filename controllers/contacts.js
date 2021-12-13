const createHttpError = require('http-errors')
const { catchAsync } = require('../helpers')
const { endpointResponse } = require('../helpers/success')
const { getContacts, addContact } = require('../services/contacts')
const { sendMail } = require('../helpers/mailSender')

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
      const httpError = createHttpError(
        error.status,
        `[Error retrieving contacts][contacts-GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  addContact: catchAsync(async (req, res, next) => {
    try {
      const {
        name, email, phone, message = '',
      } = req.body
      const contact = await addContact({
        name,
        email,
        phone,
        message,
      })
      endpointResponse({
        res,
        message: 'Contact was added successfully.',
        body: contact,
      })
      if (contact) {
        sendMail(
          email,
          'Recibimos tu mensaje!',
          `Gracias por tu mensaje ${name}. A la brevedad estaremos en contacto!`,
        )
      }
    } catch (error) {
      const httpError = createHttpError(
        error.status,
        `[Error adding contact] - [contacts - put]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
