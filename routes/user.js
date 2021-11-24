const express = require('express')
const { get } = require('../controllers/users')

const router = new express.Router()

/* GET users listing. */
router.get('/', get)

module.exports = router
