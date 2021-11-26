const express = require('express')
const { get } = require('../controllers/members')

const router = express.Router()

/* GET all active members */
router.get('/', get)

module.exports = router
