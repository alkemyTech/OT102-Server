const express = require('express')
const { get, destroy } = require('../controllers/members')

const router = express.Router()

/* GET all active members */
router.get('/', get)
router.delete('/:id', destroy)

module.exports = router
