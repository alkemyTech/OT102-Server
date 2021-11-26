const express = require('express')
const { get, destroy } = require('../controllers/categories')

const router = new express.Router()

// Get Categories listing:
router.get('/', get)
// Delete Category by ID:
router.delete('/:id', destroy)

module.exports = router
