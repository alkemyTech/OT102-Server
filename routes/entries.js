const express = require('express')
const { get, getEntry } = require('../controllers/entry')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)

module.exports = router
