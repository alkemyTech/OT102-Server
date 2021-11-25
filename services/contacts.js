const { Contact } = require('../models')

exports.getContacts = async () => {
  try {
    const contacts = await Contact.findAll()
    return contacts
  } catch (err) {
    throw Error(err.message)
  }
}
