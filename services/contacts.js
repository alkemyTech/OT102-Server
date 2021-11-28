const { ErrorObject } = require('../helpers/error')
const { Contact } = require('../models')

exports.getContacts = async () => {
  try {
    const contacts = await Contact.findAll()
    return contacts
  } catch (err) {
    throw Error(err.message)
  }
}
exports.addContact = async (contact) => {
  try {
    const newContact = await Contact.create(contact)
    return newContact
  } catch (err) {
    throw new ErrorObject(err.message, 400)
  }
}
