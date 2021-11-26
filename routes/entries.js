const express = require('express')
const { getEntry } = require('../controllers/entry')

const router = new express.Router()

router.get('/:id', getEntry)

module.exports = router
