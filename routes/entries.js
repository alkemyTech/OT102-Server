const express = require('express')
const { get, getEntry, destroy } = require('../controllers/entry')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)
router.delete('/:id', destroy)

module.exports = router
