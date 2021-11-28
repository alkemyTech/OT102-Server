const express = require('express')
const { get, addContact } = require('../controllers/contacts')

const router = new express.Router()

router.get('/', get)
router.post('/', addContact)

module.exports = router
