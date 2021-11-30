const express = require('express')
const { get, getEntry, destroy } = require('../controllers/entry')
const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)
router.delete('/:id', isAdmin, destroy)

module.exports = router
