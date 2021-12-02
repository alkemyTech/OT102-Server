const express = require('express')
const { get } = require('../controllers/contacts')
const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

router.get('/', isAdmin, get)

module.exports = router
