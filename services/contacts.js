const createHttpError = require('http-errors')
const { Contact } = require('../models')

exports.getContacts = async () => {
  try {
    const contacts = await Contact.findAll()
    return contacts
  } catch (err) {
    const httpError = createHttpError(400, err.message)
    throw httpError
  }
}
exports.addContact = async (contact) => {
  try {
    const newContact = await Contact.create(contact)
    return newContact
  } catch (err) {
    const httpError = createHttpError(400, err.message)
    throw httpError
  }
}
