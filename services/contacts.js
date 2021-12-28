const createHttpError = require('http-errors')
const { ErrorObject } = require('../helpers/error')
const { Contact } = require('../models')
const db = require('../models/index')

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
exports.getById = async (id) => {
  try {
    const contactById = await Contact.findByPk(id)
    if (!contactById) {
      throw new ErrorObject(`No contact found with ID: ${id}`, 404)
    }
    return contactById
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
exports.deleteContactPermanently = async (id) => {
  try {
    return await db.sequelize.query('DELETE FROM Contacts WHERE id = :id', {
      replacements: { id },
      type: db.sequelize.QueryTypes.DELETE,
    })
  } catch (error) {
    throw Error(error.message)
  }
}
