const express = require('express')
const { get, addContact } = require('../controllers/contacts')
const { validateRequest } = require('../middlewares')
const { contactSchema } = require('../schemas/contacs')

const router = new express.Router()

router.get('/', get)
router.post('/', validateRequest(contactSchema), addContact)

module.exports = router
